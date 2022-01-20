using Backend.Api.Data;
using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class UserRepo : GenericRepo<User>, IUserRepo
{
  private readonly DataContext _context;

  public UserRepo(DataContext aContext) : base(aContext)
  {
    _context = aContext;
  }

  public async Task<User> GetMe(Guid aId)
  {
    return await _context.Users
      .AsNoTracking()
      .Include(user => user.Cars)
      .Include(user => user.Garages)
      .SingleOrDefaultAsync(user => user.Id == aId);
  }
}