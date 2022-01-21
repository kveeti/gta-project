using Backend.Api.Attributes;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/users")]
public class UserController : ControllerBase
{
  private readonly IUserRepo _db;
  private readonly IJwt _jwt;

  public UserController(IUserRepo aUserRepo, IJwt aJwt)
  {
    _db = aUserRepo;
    _jwt = aJwt;
  }

  [HttpGet("me")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<ReturnUserDto>> GetMe()
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var user = await _db.GetMe(userId);
    if (user == null) return NotFound();

    ReturnMeDto returnUser = new()
    {
      Id = user.Id,
      Username = user.Username,
      Email = user.Email,
      Role = user.Role,
      GarageCount = user.Garages.Count,
      CarCount = user.Cars.Count
    };

    return Ok(returnUser);
  }

  [HttpGet("{id:Guid}")]
  [Authorization.CustomAuth("Admin")]
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
  [Authorization.CustomAuth("Admin")]
  public async Task<ActionResult<IEnumerable<ReturnUserDto>>> GetAll()
  {
    var users = await _db.GetAll();
    var toReturn = users.Select(u => new ReturnUserDto()
    {
      Id = u.Id,
      Username = u.Username,
      Role = u.Role
    });

    return Ok(toReturn);
  }

  [HttpPatch("{id:Guid}")]
  [Authorization.CustomAuth("Admin")]
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

  [HttpDelete("{id:Guid}")]
  [Authorization.CustomAuth("Admin")]
  public async Task<ActionResult<string>> Delete(Guid id)
  {
    var userToDelete = await _db.GetOneByFilter(u => u.Id == id);
    if (userToDelete == null) return NotFound("user was not found");

    _db.Delete(userToDelete);
    await _db.Save();

    return NoContent();
  }
}