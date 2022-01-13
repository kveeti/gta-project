using Backend.Dtos;
using Backend.Helpers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Backend.Controllers;

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
        var hash = Hashing.HashToString(authUser.Password);

        User user = new()
        {
            Username = authUser.Username,
            Password = hash,
            Role = "Standard"
        };

        var token = Jwt.BuildToken(user.Username, user.Role, _settings);

        try
        {
            await _db.Add(user);
        }
        catch (DbUpdateException)
        {
            return BadRequest("Username taken");
        }
        catch
        {
            return StatusCode(500);
        }

        return Ok(token);
    }

    [HttpPost("login")]
    public ActionResult<string> Login(AuthUserDto userDto)
    {
        var user = _db.GetByUsername(userDto.Username);
        if (user == null) return NotFound();

        var match = Hashing.Verify(userDto.Password, user.Password);

        if (!match) return Unauthorized();

        var token = Jwt.BuildToken(user.Username, user.Role, _settings);

        return Ok(token);
    }
}