using Backend.Api.Attributes;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Backend.Api.Configs;
using Backend.Api.Dtos;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly IMisc _misc;
  private readonly IMailing _mailing;
  private readonly IGenericRepo<User> _userRepo;

  public AuthController(
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
      var emailConfirmationToken = _misc.GenerateEmailConfirmationToken();

      user.EmailVerifyToken = _misc.HashGeneratedToken(emailConfirmationToken);

      _mailing.SendEmailConfirmation(aDto.Email, emailConfirmationToken);
    }

    _userRepo.Add(user);
    await _userRepo.Save();

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = _misc.CreateCookie(newRefreshToken);

    HttpContext.Response.Headers[CookieConfig.AccessTokenHeader] = newAccessToken;

    return NoContent();
  }

  [HttpPost("login")]
  public async Task<ActionResult<string>> Login(AuthUserDto aDto)
  {
    User user = null;
    user = await _userRepo.GetOneByFilter(user => user.Username == aDto.UsernameOrEmail);
    user ??= await _userRepo.GetOneByFilter(user => user.Email == aDto.UsernameOrEmail);
    if (user == null) return BadRequest("Incorrect credentials");

    var match = Hashing.Verify(aDto.Password, user.Password);
    if (!match) return BadRequest("Incorrect credentials");

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = _misc.CreateCookie(newRefreshToken);

    HttpContext.Response
      .Headers[CookieConfig.AccessTokenHeader] = newAccessToken;

    return NoContent();
  }

  [HttpPost("logout")]
  public async Task<NoContentResult> Logout()
  {
    var accessTokenFromHeader = HttpContext.Request.Headers.Authorization.ToString().Split(" ").Last();
    if (accessTokenFromHeader.StartsWith("ey"))
    {
      var accessToken = _jwt.ValidateAccessToken(accessTokenFromHeader);
      if (accessToken != null && accessToken.IsTestAccount)
      {
        // delete test accounts on logout
        await _userRepo.Delete(accessToken.UserId);
      }
    }

    HttpContext.Response.Headers.SetCookie = _misc.GetDeleteCookie();

    HttpContext.Response
      .Headers[CookieConfig.AccessTokenHeader] = "";

    return NoContent();
  }

  [HttpGet("tokens")]
  public async Task<ActionResult> GetTokens()
  {
    var refreshTokenFromCookie = HttpContext.Request.Cookies[CookieConfig.RefreshTokenCookie];
    var refreshToken = _jwt.ValidateRefreshToken(refreshTokenFromCookie);

    if (refreshTokenFromCookie == null || refreshToken == null)
      return Unauthorized();

    var user = await _userRepo.GetOneByFilterTracking(user => user.Id == refreshToken.UserId);
    if (user == null) return Unauthorized();

    user.TokenVersion = Guid.NewGuid();
    await _userRepo.Save();

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = _misc.CreateCookie(newRefreshToken);

    HttpContext.Response
      .Headers[CookieConfig.AccessTokenHeader] = newAccessToken;

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
    if (user == null) return BadRequest("User not found");

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
      .SetCookie = _misc.CreateCookie(newRefreshToken);

    HttpContext.Response
      .Headers[CookieConfig.AccessTokenHeader] = newAccessToken;

    _mailing.SendPasswordChanged(user.Email);

    return NoContent();
  }

  [HttpPost("init-password-reset")]
  public async Task<ActionResult<string>> InitPasswordReset(InitPasswordResetDto aDto)
  {
    var user = await _userRepo.GetOneByFilterTracking(user => user.Email == aDto.Email);
    if (user == null) return BadRequest("User was not found");
    if (user.IsTestAccount) return BadRequest("Test accounts can't change their passwords");

    var passwordResetToken = _misc.GeneratePasswordResetToken();
    var hashedToken = _misc.HashGeneratedToken(passwordResetToken);

    user.PasswordResetToken = hashedToken;
    await _userRepo.Save();

    _mailing.SendPasswordReset(user.Email, passwordResetToken);

    return NoContent();
  }

  [HttpPost("reset-password")]
  public async Task<ActionResult> ResetPassword(PasswordResetDto aDto)
  {
    var hashedToken = _misc.HashGeneratedToken(aDto.PasswordResetToken);

    var user = await _userRepo.GetOneByFilterTracking(user => user.PasswordResetToken == hashedToken);
    if (user == null) return BadRequest("Invalid link");
    if (user.PasswordResetToken == null) return BadRequest("Invalid link");

    var hashedNewPassword = Hashing.HashToString(aDto.NewPassword);

    user.Password = hashedNewPassword;
    user.PasswordResetToken = null;
    await _userRepo.Save();

    _mailing.SendPasswordChanged(user.Email);

    return NoContent();
  }
}