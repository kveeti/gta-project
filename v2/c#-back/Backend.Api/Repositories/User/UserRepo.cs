using System.Linq.Expressions;
using Backend.Api.Data;
using Backend.Api.Models;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class UserRepo : GenericRepo<User>, IUserRepo
{
  private readonly DataContext _context;

  public UserRepo(DataContext aContext) : base(aContext)
  {
    _context = aContext;
  }

  public async Task<User> GetOne(Guid aId)
  {
    return await _context.Users
      .AsNoTracking()
      .Include(user => user.Cars)
      .Include(user => user.Garages)
      .SingleOrDefaultAsync(user => user.Id == aId);
  }

  public async Task<IEnumerable<User>> GetMany([CanBeNull] Expression<Func<User, bool>> aFilter = null)
  {
    var dbQuery = _context.Users
      .AsNoTracking()
      .Include(user => user.Cars)
      .Include(user => user.Garages);

    if (aFilter == null) return await dbQuery.ToListAsync();

    return await dbQuery.Where(aFilter).ToListAsync();
  }
}