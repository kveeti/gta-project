using Backend.Api.Attributes;
using Backend.Api.Configs;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly IOptions<CookieConfig> _cookieConfig;
  private readonly IGenericRepo<User> _userRepo;
  private readonly IMailing _mailing;

  public AuthController(
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

  [HttpPost("register")]
  public async Task<ActionResult<string>> Register(RegisterUserDto aDto)
  {
    var usernameCheck = await _userRepo.GetOneByFilter(user => user.Username == aDto.Username);
    if (usernameCheck != null) return Conflict("Username taken");

    var emailCheck = await _userRepo.GetOneByFilter(user => user.Email == aDto.Email);
    if (emailCheck != null) return Conflict("Email in use");

    var hash = Hashing.HashToString(aDto.Password);

    User user = new()
    {
      Id = Guid.NewGuid(),
      Email = aDto.Email,
      Username = aDto.Username,
      Password = hash,
      Role = "Standard",
      TokenVersion = Guid.NewGuid(),
      IsTestAccount = aDto.IsTestAccount
    };

    if (!aDto.IsTestAccount)
    {
      var emailVerifyToken = $"{Guid.NewGuid().ToString()}{Guid.NewGuid().ToString()}";

      user.EmailVerifyToken = emailVerifyToken;

      _mailing.SendEmailConfirmation(aDto.Email, emailVerifyToken);
    }

    _userRepo.Add(user);
    await _userRepo.Save();

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_cookieConfig.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = newAccessToken;

    return NoContent();
  }

  [HttpPost("login")]
  public async Task<ActionResult<string>> Login(AuthUserDto aDto)
  {
    var user = await _userRepo.GetOneByFilter(user => user.Username == aDto.Username);
    if (user == null) return BadRequest("Incorrect credentials");

    var match = Hashing.Verify(aDto.Password, user.Password);
    if (!match) return BadRequest("Incorrect credentials");

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_cookieConfig.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = newAccessToken;

    return NoContent();
  }

  [HttpPost("logout")]
  public ActionResult Logout()
  {
    HttpContext.Response.Headers.SetCookie = Cookie.GetDeleteCookie(_cookieConfig.Value.RefreshTokenCookieName);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = "";

    return NoContent();
  }

  [HttpPatch("change-password")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<ReturnUserDto>> ChangePassword(ChangePasswordDto aDto)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var user = await _userRepo.GetOneByFilterTracking(user => user.Id == userId);
    if (user == null) return NotFound();

    if (user.IsTestAccount)
      return BadRequest("Test accounts can't change their password");

    var currentPasswordsMatch = Hashing.Verify(aDto.CurrentPassword, user.Password);
    if (!currentPasswordsMatch) return BadRequest("Current password was incorrect");

    var newPasswordHash = Hashing.HashToString(aDto.NewPassword);

    user.Password = newPasswordHash;
    user.TokenVersion = Guid.NewGuid();
    await _userRepo.Save();

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_cookieConfig.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = newAccessToken;

    _mailing.SendPasswordChanged(user.Email);

    return NoContent();
  }

  [HttpGet("tokens")]
  public async Task<ActionResult> GetAccessToken()
  {
    var refreshTokenFromCookie = HttpContext.Request.Cookies[_cookieConfig.Value.RefreshTokenCookieName];
    var refreshToken = _jwt.ValidateRefreshToken(refreshTokenFromCookie);

    if (refreshTokenFromCookie == null || refreshToken == null)
      return Unauthorized();

    var user = await _userRepo.GetOneByFilterTracking(user => user.Id == refreshToken.UserId);
    if (user == null) return Unauthorized();

    user.TokenVersion = Guid.NewGuid();

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_cookieConfig.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = newAccessToken;

    return NoContent();
  }
}