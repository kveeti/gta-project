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
  private readonly IGenericRepo<User> _db;
  private readonly IOptions<Settings> _settings;

  public AuthController(IGenericRepo<User> aUserRepo, IOptions<Settings> aSettings)
  {
    _db = aUserRepo;
    _settings = aSettings;
  }

  [HttpPost("register")]
  public async Task<ActionResult<string>> Register(AuthUserDto aDto)
  {
    var existingUser = await _db.GetOneByFilter(user => user.Username == aDto.Username);
    if (existingUser != null) return BadRequest("Username taken");

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
    
    var token = Jwt.Encode(user.Username, user.Role, user.Id, _settings);

    return Ok(token);
  }

  [HttpPost("login")]
  public async Task<ActionResult<string>> Login(AuthUserDto aDto)
  {
    var user = await _db.GetOneByFilter(user => user.Username == aDto.Username);
    if (user == null) return NotFound();

    var match = Hashing.Verify(aDto.Password, user.Password);
    if (!match) return Unauthorized();

    var token = Jwt.Encode(user.Username, user.Role, user.Id, _settings);

    return Ok(token);
  }
}