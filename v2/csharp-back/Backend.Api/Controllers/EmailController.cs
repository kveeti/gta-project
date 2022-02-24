using Backend.Api.Attributes;
using Backend.Api.Dtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Backend.Api.Configs;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/email")]
public class EmailController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly IMisc _misc;
  private readonly IMailing _mailing;
  private readonly IGenericRepo<User> _userRepo;

  public EmailController(
    IJwt aJwt,
    IMisc aMisc,
    IMailing aMailing,
    IGenericRepo<User> aUserRepo
  )
  {
    _jwt = aJwt;
    _misc = aMisc;
    _mailing = aMailing;
    _userRepo = aUserRepo;
  }

  [HttpPost("change")]
  [Authorization.CustomAuth("Admin, Standard")]
  public async Task<ActionResult<string>> ChangeEmail(ChangeEmailDto aDto)
  {
    var emailInUse = await _userRepo.GetOneByFilter(user => user.Email == aDto.NewEmail);
    if (emailInUse != null) return BadRequest("Email in use");

    var user = await _userRepo.GetOneByFilterTracking(user => user.Id == aDto.UserId);
    if (user == null) return NotFound("user was not found");

    if (user.IsTestAccount) return BadRequest("Test accounts can't change their email");

    var emailConfirmationToken = _misc.GenerateEmailConfirmationToken();
      
    user.Email = aDto.NewEmail;
    user.EmailVerifyToken = _misc.HashGeneratedToken(emailConfirmationToken);
    await _userRepo.Save();

    _mailing.SendEmailConfirmation(aDto.NewEmail, emailConfirmationToken);

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = _misc.CreateCookie(newRefreshToken);

    HttpContext.Response
      .Headers[CookieConfig.AccessTokenHeader] = newAccessToken;

    return NoContent();
  }

  [HttpPost("verify")]
  public async Task<ActionResult<string>> ConfirmEmail(VerifyEmailDto aDto)
  {
    if (aDto.Token == null) return BadRequest("Invalid token");

    var hashed = _misc.HashGeneratedToken(aDto.Token);

    var user = await _userRepo
      .GetOneByFilterTracking(user => user.EmailVerifyToken == hashed);

    if (user == null) return BadRequest("Invalid token");

    if (user.IsTestAccount) return BadRequest("Test accounts have verified emails by default");

    user.EmailVerifyToken = null;
    await _userRepo.Save();

    return NoContent();
  }

  [HttpPost("resend")]
  public async Task<ActionResult<string>> ResendVerificationEmail(ResendEmailDto aDto)
  {
    var user = await _userRepo
      .GetOneByFilterTracking(user => user.Id == aDto.UserId
                                      && user.EmailVerifyToken != null);

    if (user == null) return BadRequest("Invalid request");

    if (user.IsTestAccount) return BadRequest("Test accounts have verified emails by default");

    var emailConfirmationToken = _misc.GenerateEmailConfirmationToken();

    user.EmailVerifyToken = _misc.HashGeneratedToken(emailConfirmationToken);
    await _userRepo.Save();

    await _mailing.SendEmailConfirmation(user.Email, emailConfirmationToken);

    return NoContent();
  }
}