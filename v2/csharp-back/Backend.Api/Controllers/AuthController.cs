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

  public AuthController(
    IJwt aJwt,
    IOptions<CookieConfig> aCookieConfig,
    IGenericRepo<User> aUserRepo
  )
  {
    _jwt = aJwt;
    _cookieConfig = aCookieConfig;
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
      TokenVersion = Guid.NewGuid()
    };

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
    if (user == null) return NotFound("user not found");

    var match = Hashing.Verify(aDto.Password, user.Password);
    if (!match) return Unauthorized("incorrect credentials");

    var newAccessToken = _jwt.CreateAccessToken(user);
    var newRefreshToken = _jwt.CreateRefreshToken(user);

    HttpContext.Response.Headers
      .SetCookie = Cookie.CreateCookie(_cookieConfig.Value.RefreshTokenCookieName, newRefreshToken);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = newAccessToken;

    return NoContent();
  }

  [HttpPost("logout")]
  public NoContentResult Logout()
  {
    HttpContext.Response.Cookies.Delete(_cookieConfig.Value.RefreshTokenCookieName);

    HttpContext.Response
      .Headers[_cookieConfig.Value.AccessTokenHeaderName] = "";

    return NoContent();
  }
}