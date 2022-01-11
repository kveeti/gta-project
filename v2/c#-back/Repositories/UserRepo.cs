using Backend.Data;
using Backend.Dtos;
using Backend.Models;

namespace Backend.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly DataContext _context;

        public UserRepo(DataContext context)
        {
            _context = context;
        }

        public async Task<User> GetById(int Id)
        {
            return await _context.Users.FindAsync(Id);
        }

        public User GetByUsername(string Username)
        {
            return _context.Users
                .Where(x => x.Username == Username)
                .FirstOrDefault<User>();
        }

        public IEnumerable<ReturnUser> GetAll()
        {
            return _context.Users.ToList().Select(x => new ReturnUser()
            {
                Id = x.Id,
                Username = x.Username,
                Role = x.Role,
            });
        }

        public async Task Add(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> UpdateRole(int Id, string NewRole)
        {
            User user = await _context.Users.FindAsync(Id);
            if (user == null)
                return null;

            user.Role = NewRole;

            await _context.SaveChangesAsync();
            return user;
        }

        public async Task Delete(int Id)
        {
            User user = await _context.Users.FindAsync(Id);

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();
        }
    }
}
