using System.Linq.Expressions;
using Backend.Api.Models;
using JetBrains.Annotations;

namespace Backend.Api.Repositories;

public interface IUserRepo : IGenericRepo<User>
{
  public Task<User> GetOne(Guid aId);

  public Task<IEnumerable<User>> GetMany([CanBeNull] Expression<Func<User, bool>> aFilter = null);
}