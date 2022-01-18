using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/auth")]
public class AuthController : ControllerBase
{
  private readonly IGenericRepo<User> _db;
  private readonly IOptions<Settings> _settings;
  private readonly IJwt _jwt;

  public AuthController(
    IGenericRepo<User> aUserRepo,
    IOptions<Settings> aSettings,
    IJwt aJwt
  )
  {
    _db = aUserRepo;
    _settings = aSettings;
    _jwt = aJwt;
  }

  [HttpPost("register")]
  public async Task<ActionResult<string>> Register(AuthUserDto aDto)
  {
    var existingUser = await _db.GetOneNotJoinedByFilter(user => user.Username == aDto.Username);
    if (existingUser != null) return Conflict("username taken");

    var hash = Hashing.HashToString(aDto.Password);

    User user = new()
    {
      Id = Guid.NewGuid(),
      Username = aDto.Username,
      Password = hash,
      Role = "Standard"
    };

    _db.Add(user);
    await _db.Save();

    var token = _jwt.Encode(user.Username, user.Role, user.Id, _settings);

    return Ok(token);
  }

  [HttpPost("login")]
  public async Task<ActionResult<string>> Login(AuthUserDto aDto)
  {
    var user = await _db.GetOneNotJoinedByFilter(user => user.Username == aDto.Username);
    if (user == null) return NotFound("user not found");

    var match = Hashing.Verify(aDto.Password, user.Password);
    if (!match) return Unauthorized("incorrect password");

    var token = _jwt.Encode(user.Username, user.Role, user.Id, _settings);

    return Ok(token);
  }
}