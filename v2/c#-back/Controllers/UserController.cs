using Backend.Dtos;
using Backend.Helpers;
using Backend.Helpers.testApi.Helpers;
using Backend.Models;
using Backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Backend.Controllers
{
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

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(AuthUser authUser)
        {
            string hash = Hashing.HashToString(authUser.Password);

            User user = new()
            {
                Username = authUser.Username,
                Password = hash,
                Role = "Standard"
            };

            string token = JWT.BuildToken(user.Username, user.Role, _settings.Value.JWT_Iss, _settings.Value.JWT_Aud, _settings.Value.JWT_Secret);

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
        public ActionResult<string> Login(AuthUser authUser)
        {
            User user = _db.GetByUsername(authUser.Username);
            if (user == null) return NotFound();

            bool match = Hashing.Verify(authUser.Password, user.Password);

            if (!match) return Unauthorized();

            string token = JWT.BuildToken(user.Username, user.Role, _settings.Value.JWT_Iss, _settings.Value.JWT_Aud, _settings.Value.JWT_Secret);

            return Ok(token);
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<User>> GetOne(int id)
        {
            User user = await _db.GetById(id);
            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public ActionResult<IEnumerable<User>> GetAll()
        {
            var users = _db.GetAll();
            return Ok(users);
        }

        [HttpPatch("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<User>> UpdateRole(int id, UpdateUser userDto)
        {
            User user = await _db.UpdateRole(id, userDto.NewRole);

            return Ok(user);
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            await _db.Delete(id);

            return NoContent();
        }
    }
}
