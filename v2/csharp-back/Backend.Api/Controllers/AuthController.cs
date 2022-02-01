using Backend.Api.Attributes;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Backend.Api.Configs;
using Backend.Api.AuthDtos;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly IMailing _mailing;
  private readonly IOptions<JwtConfig> _jwtConfig;
  private readonly IGenericRepo<User> _userRepo;

  public AuthController(
    IJwt aJwt,
    IMailing aMailing,
    IGenericRepo<User> aUserRepo,
    IOptions<JwtConfig> aJwtConfig
  )
  {
    _jwt = aJwt;
    _mailing = aMailing;
    _userRepo = aUserRepo;
    _jwtConfig = aJwtConfig;
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
      .SetCookie = Cookie.CreateCookie(newRefreshToken);

    HttpContext.Response.Headers[CookieConfig.AccessTokenHeader] = newAccessToken;

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
      .SetCookie = Cookie.CreateCookie(newRefreshToken);

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

    HttpContext.Response.Headers.SetCookie = Cookie.GetDeleteCookie();

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
      .SetCookie = Cookie.CreateCookie(newRefreshToken);

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
      .SetCookie = Cookie.CreateCookie(newRefreshToken);

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

    var passwordResetToken = $"{Guid.NewGuid().ToString()}-{Guid.NewGuid().ToString()}";
    var hashedToken = Hashing.HmacSha256(passwordResetToken, _jwtConfig.Value.Access_Secret);

    user.PasswordResetToken = hashedToken;
    await _userRepo.Save();

    _mailing.SendPasswordReset(user.Email, passwordResetToken);

    return NoContent();
  }

  [HttpPost("reset-password")]
  public async Task<ActionResult> ResetPassword(PasswordResetDto aDto)
  {
    var hashedToken = Hashing.HmacSha256(aDto.PasswordResetToken, _jwtConfig.Value.Access_Secret);

    var user = await _userRepo.GetOneByFilterTracking(user => user.PasswordResetToken == hashedToken);
    if (user == null) return BadRequest("User not found");
    if (user.PasswordResetToken == null) return BadRequest("Invalid link");

    var hashedNewPassword = Hashing.HashToString(aDto.NewPassword);

    user.Password = hashedNewPassword;
    user.PasswordResetToken = null;
    await _userRepo.Save();

    _mailing.SendPasswordChanged(user.Email);

    return NoContent();
  }
}