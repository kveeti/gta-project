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
  private readonly IGenericRepo<User> _db;
  private readonly IOptions<Settings> _settings;

  public UserController(IGenericRepo<User> aUserRepo, IOptions<Settings> aSettings)
  {
    _db = aUserRepo;
    _settings = aSettings;
  }

  [HttpGet("{id:Guid}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<ReturnUserDto>> GetOne(Guid id)
  {
    var user = await _db.GetOneByFilter(u => u.Id == id);
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

  [HttpPatch("{id:Guid}")]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public async Task<ActionResult<ReturnUserDto>> UpdateRole(Guid id, UpdateUserDto aUserDto)
  {
    var existingUser = await _db.GetOneByFilter(u => u.Id == id);
    if (existingUser == null) return NotFound();

    User updatedUser = new()
    {
      Id = existingUser.Id,
      Username = existingUser.Username,
      Password = existingUser.Password,
      Role = aUserDto.NewRole
    };

    await _db.Save();

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
    var userToDelete = await _db.GetOneByFilter(u => u.Id == aId);
    if (userToDelete == null) return NotFound();

    _db.Delete(userToDelete);
    await _db.Save();

    return NoContent();
  }
}