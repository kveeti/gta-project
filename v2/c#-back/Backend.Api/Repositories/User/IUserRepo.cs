using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface IUserRepo : IGenericRepo<User>
{
  public Task<User> GetMe(Guid aId);
}