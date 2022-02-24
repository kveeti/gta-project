using Backend.Api.Attributes;
using Backend.Api.Dtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Backend.Api.Helpers;
using Backend.Api.Configs;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
  private readonly IUserRepo _db;
  private readonly IMisc _misc;

  public UserController(IUserRepo aUserRepo, IMisc aMisc)
  {
    _db = aUserRepo;
    _misc = aMisc;
  }

  [HttpGet("me")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<ReturnUserDto>> GetMe()
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var user = await _db.GetOne(userId);
    if (user == null) return NotFound();

    return Ok(user);
  }

  [HttpGet("{id:Guid}")]
  [Authorization.CustomAuth("Admin")]
  public async Task<ActionResult<ReturnUserDto>> GetOne(Guid id)
  {
    var user = await _db.GetOne(id);
    if (user == null) return NotFound();

    return Ok(user);
  }

  [HttpGet]
  [Authorization.CustomAuth("Admin")]
  public async Task<ActionResult<IEnumerable<User>>> GetAll()
  {
    var users = await _db.GetMany();

    return Ok(users);
  }

  [HttpPatch("{id:Guid}/role")]
  [Authorization.CustomAuth("Admin")]
  public async Task<ActionResult<ReturnUserDto>> UpdateRole(Guid id, UpdateUserDto aUserDto)
  {
    var existingUser = await _db.GetOneByFilterTracking(user => user.Id == id);
    if (existingUser == null) return NotFound();
    if (HttpContext.Items["emailVerified"] as string == "False") return BadRequest("Email must be verified");

    existingUser.Role = aUserDto.NewRole;

    await _db.Save();

    ReturnUserDto returnUser = new()
    {
      Id = existingUser.Id,
      Username = existingUser.Username,
      Email = existingUser.Email,
      Role = existingUser.Role,
      EmailVerified = existingUser.EmailVerifyToken == null,
      IsTestAccount = existingUser.IsTestAccount
    };

    return Ok(returnUser);
  }

  [HttpDelete("me")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<string>> Delete(DeleteUserDto aDto)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var userToDelete = await _db.GetOneByFilter(user => user.Id == userId);
    if (userToDelete == null) return NotFound("user was not found");

    var match = Hashing.Verify(aDto.Password, userToDelete.Password);
    if (!match) return BadRequest("Incorrect password");

    _db.Delete(userToDelete);
    await _db.Save();

    HttpContext.Response.Headers.SetCookie = _misc.GetDeleteCookie();

    HttpContext.Response
      .Headers[CookieConfig.AccessTokenHeader] = "";

    return NoContent();
  }
}