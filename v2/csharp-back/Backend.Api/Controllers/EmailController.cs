using Backend.Api.Attributes;
using Backend.Api.Configs;
using Backend.Api.EmailDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/email")]
public class EmailController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly IMailing _mailing;
  private readonly IGenericRepo<User> _userRepo;
  private readonly IOptions<CookieConfig> _cookieConfig;

  public EmailController(
    IJwt aJwt,
    IMailing aMailing,
    IGenericRepo<User> aUserRepo,
    IOptions<CookieConfig> aCookieConfig
  )
  {
    _jwt = aJwt;
    _cookieConfig = aCookieConfig;
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

    var emailConfirmationToken = $"{Guid.NewGuid().ToString()}{Guid.NewGuid().ToString()}";

    user.Email = aDto.NewEmail;
    user.EmailVerifyToken = emailConfirmationToken;
    await _userRepo.Save();

    _mailing.SendEmailConfirmation(aDto.NewEmail, emailConfirmationToken);

    HttpContext.Response.Cookies.Delete(_cookieConfig.Value.RefreshTokenCookieName);

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_cookieConfig.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = newAccessToken;

    return NoContent();
  }

  [HttpPost("verify")]
  [Authorization.CustomAuth("Admin, Standard")]
  public async Task<ActionResult<string>> ConfirmEmail(VerifyEmailDto aDto)
  {
    if (aDto.Token == null) return BadRequest("Invalid token");
    
    var user = await _userRepo
      .GetOneByFilterTracking(user => user.EmailVerifyToken == aDto.Token);
    
    if (user == null) return BadRequest("Invalid token");

    user.EmailVerifyToken = null;
    await _userRepo.Save();

    return NoContent();
  }
}