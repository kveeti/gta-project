using Backend.Api.Dtos.UserDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Backend.Api.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
  private readonly IUserRepo _db;
  private readonly IOptions<Settings> _settings;

  public UserController(IUserRepo userRepo, IOptions<Settings> settings)
  {
    _db = userRepo;
    _settings = settings;
  }

  [HttpGet("{id}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<ReturnUserDto>> GetOne(Guid id)
  {
    var user = await _db.GetById(id);
    if (user == null) return NotFound();

    ReturnUserDto returnUser = new()
    {
      Id = user.Id,
      Username = user.Username,
      Role = user.Role,
    };

    return Ok(returnUser);
  }

  [HttpGet]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public ActionResult<IEnumerable<ReturnUserDto>> GetAll()
  {
    var users = _db.GetAll();
    return Ok(users);
  }

  [HttpPatch("{id}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<ReturnUserDto>> UpdateRole(Guid id, UpdateUserDto userDto)
  {
    var existingUser = await _db.GetById(id);
    if (existingUser == null) return NotFound();

    User updatedUser = new()
    {
      Id = existingUser.Id,
      Username = existingUser.Username,
      Password = existingUser.Password,
      Role = userDto.NewRole
    };

    await _db.Update(updatedUser);

    ReturnUserDto returnUser = new()
    {
      Id = updatedUser.Id,
      Username = updatedUser.Username,
      Role = updatedUser.Role
    };

    return Ok(returnUser);
  }

  [HttpDelete("{id}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<User>> Delete(Guid id)
  {
    var userToDelete = await _db.GetById(id);
    if (userToDelete == null) return NotFound();

    await _db.Delete(userToDelete);

    return NoContent();
  }
}