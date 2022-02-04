using System.Linq.Expressions;
using Backend.Api.Models;
using JetBrains.Annotations;
using Backend.Api.Dtos;

namespace Backend.Api.Repositories;

public interface IUserRepo : IGenericRepo<User>
{
  public Task<ReturnUserDto> GetOne(Guid aId);
  public Task<IEnumerable<User>> GetMany([CanBeNull] Expression<Func<User, bool>> aFilter = null);
}