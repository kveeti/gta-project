using Backend.Api.Data;
using Backend.Api.Dtos;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public class UserRepo : IUserRepo
{
  private readonly DataContext _context;

  public UserRepo(DataContext context)
  {
    _context = context;
  }

  public async Task<User> GetById(Guid id)
  {
    return await _context.Users.FindAsync(id);
  }

  public User GetByUsername(string username)
  {
    return _context.Users
      .FirstOrDefault(x => x.Username == username);
  }

  public IEnumerable<ReturnUserDto> GetAll()
  {
    return _context.Users.ToList().Select(x => new ReturnUserDto()
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

  public async Task Update(User user)
  {
    _context.Users.Update(user);
    await _context.SaveChangesAsync();
  }

  public async Task Delete(User user)
  {
    _context.Users.Remove(user);
    await _context.SaveChangesAsync();
  }
}