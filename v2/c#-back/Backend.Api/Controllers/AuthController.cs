using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
  private readonly IUserRepo _db;
  private readonly IOptions<Settings> _settings;

  public AuthController(IUserRepo userRepo, IOptions<Settings> settings)
  {
    _db = userRepo;
    _settings = settings;
  }

  [HttpPost("register")]
  public async Task<ActionResult<string>> Register(AuthUserDto authUser)
  {
    var existingUser = _db.GetByUsername(authUser.Username);
    if (existingUser != null) return BadRequest("Username taken");

    var hash = Hashing.HashToString(authUser.Password);

    User user = new()
    {
      Username = authUser.Username,
      Password = hash,
      Role = "Standard"
    };

    var token = Jwt.Encode(user.Username, user.Role, _settings);

    await _db.Add(user);

    return Ok(token);
  }

  [HttpPost("login")]
  public ActionResult<string> Login(AuthUserDto userDto)
  {
    var user = _db.GetByUsername(userDto.Username);
    if (user == null) return NotFound();

    var match = Hashing.Verify(userDto.Password, user.Password);
    if (!match) return Unauthorized();

    var token = Jwt.Encode(user.Username, user.Role, _settings);

    return Ok(token);
  }
}