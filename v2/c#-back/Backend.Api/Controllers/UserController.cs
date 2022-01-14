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

  public UserController(IUserRepo aUserRepo, IOptions<Settings> aSettings)
  {
    _db = aUserRepo;
    _settings = aSettings;
  }

  [HttpGet("{aId:Guid}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<ReturnUserDto>> GetOne(Guid aId)
  {
    var user = await _db.GetById(aId);
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

  [HttpPatch("{aId:Guid}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<ReturnUserDto>> UpdateRole(Guid aId, UpdateUserDto aUserDto)
  {
    var existingUser = await _db.GetById(aId);
    if (existingUser == null) return NotFound();

    User updatedUser = new()
    {
      Id = existingUser.Id,
      Username = existingUser.Username,
      Password = existingUser.Password,
      Role = aUserDto.NewRole
    };

    await _db.Update();

    ReturnUserDto returnUser = new()
    {
      Id = updatedUser.Id,
      Username = updatedUser.Username,
      Role = updatedUser.Role
    };

    return Ok(returnUser);
  }

  [HttpDelete("{aId:Guid}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<User>> Delete(Guid aId)
  {
    var userToDelete = await _db.GetById(aId);
    if (userToDelete == null) return NotFound();

    await _db.Delete(userToDelete);

    return NoContent();
  }
}