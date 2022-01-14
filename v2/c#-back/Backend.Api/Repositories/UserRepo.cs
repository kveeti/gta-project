using Backend.Api.Data;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public class UserRepo : IUserRepo
{
  private readonly DataContext _context;

  public UserRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<User> GetById(Guid aId)
  {
    return await _context.Users.FindAsync(aId);
  }

  public User GetByUsername(string aUsername)
  {
    return _context.Users
      .FirstOrDefault(x => x.Username == aUsername);
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

  public async Task Add(User aUser)
  {
    _context.Users.Add(aUser);
    await _context.SaveChangesAsync();
  }

  public async Task Update()
  {
    await _context.SaveChangesAsync();
  }

  public async Task Delete(User aUser)
  {
    _context.Users.Remove(aUser);
    await _context.SaveChangesAsync();
  }
}