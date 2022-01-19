using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Backend.Api.TokenDtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/auth")]
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
  public async Task<ActionResult> Register(AuthUserDto aDto)
  {
    var existingUser = await _userRepo.GetOneByFilter(user => user.Username == aDto.Username);
    if (existingUser != null) return Conflict("username taken");

    var hash = Hashing.HashToString(aDto.Password);

    User user = new()
    {
      Id = Guid.NewGuid(),
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

    return Ok();
  }

  [HttpPost("login")]
  public async Task<ActionResult> Login(AuthUserDto aDto)
  {
    var user = await _userRepo.GetOneByFilter(user => user.Username == aDto.Username);
    if (user == null) return NotFound("user not found");

    var match = Hashing.Verify(aDto.Password, user.Password);
    if (!match) return Unauthorized("incorrect password");

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_settings.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_settings.Value.AccessTokenHeaderName] = newAccessToken;

    return Ok();
  }
  
  [HttpPost("logout")]
  public async Task<ActionResult> Logout()
  {
    HttpContext.Response.Cookies.Delete(_settings.Value.RefreshTokenCookieName);

    HttpContext.Response
      .Headers[_settings.Value.AccessTokenHeaderName] = "";

    return Ok();
  }
}