using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
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
    }
}
