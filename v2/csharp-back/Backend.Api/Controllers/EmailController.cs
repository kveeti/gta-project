using Backend.Api.Attributes;
using Backend.Api.EmailDtos;
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
  private readonly IMailing _mailing;
  private readonly IGenericRepo<User> _userRepo;

  public EmailController(
    IJwt aJwt,
    IMailing aMailing,
    IGenericRepo<User> aUserRepo
  )
  {
    _jwt = aJwt;
    _userRepo = aUserRepo;
    _mailing = aMailing;
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

    var emailConfirmationToken = $"{Guid.NewGuid().ToString()}{Guid.NewGuid().ToString()}";

    user.Email = aDto.NewEmail;
    user.EmailVerifyToken = emailConfirmationToken;
    await _userRepo.Save();

    _mailing.SendEmailConfirmation(aDto.NewEmail, emailConfirmationToken);

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(newRefreshToken);

    HttpContext.Response
      .Headers[CookieConfig.AccessTokenHeader] = newAccessToken;

    return NoContent();
  }

  [HttpPost("verify")]
  public async Task<ActionResult<string>> ConfirmEmail(VerifyEmailDto aDto)
  {
    if (aDto.Token == null) return BadRequest("Invalid token");

    var user = await _userRepo
      .GetOneByFilterTracking(user => user.EmailVerifyToken == aDto.Token);

    if (user == null) return BadRequest("Invalid token");

    if (user.IsTestAccount) return BadRequest("Test accounts have verified emails by default");

    user.EmailVerifyToken = null;
    await _userRepo.Save();

    return NoContent();
  }
}