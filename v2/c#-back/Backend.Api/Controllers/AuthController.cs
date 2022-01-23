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
  private readonly IOptions<Settings> _settings;
  private readonly IGenericRepo<User> _userRepo;

  public AuthController(
    IJwt aJwt,
    IOptions<Settings> aSettings,
    IGenericRepo<User> aUserRepo
  )
  {
    _jwt = aJwt;
    _settings = aSettings;
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
      TokenVersion = 1
    };

    _userRepo.Add(user);
    await _userRepo.Save();

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_settings.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_settings.Value.AccessTokenHeaderName] = newAccessToken;

    return NoContent();
  }

  [HttpPost("login")]
  public async Task<ActionResult<string>> Login(AuthUserDto aDto)
  {
    var user = await _userRepo.GetOneByFilter(user => user.Username == aDto.Username);
    if (user == null) return NotFound("user not found");

    var match = Hashing.Verify(aDto.Password, user.Password);
    if (!match) return Unauthorized("incorrect credentials");

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_settings.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_settings.Value.AccessTokenHeaderName] = newAccessToken;

    return NoContent();
  }

  [HttpPost("logout")]
  public NoContentResult Logout()
  {
    HttpContext.Response.Cookies.Delete(_settings.Value.RefreshTokenCookieName);

    HttpContext.Response
      .Headers[_settings.Value.AccessTokenHeaderName] = "";

    return NoContent();
  }
}