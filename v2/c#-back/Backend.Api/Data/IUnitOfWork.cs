using Backend.Api.Repositories;

namespace Backend.Api.Data;

public interface IUnitOfWork
{
  public IModelCarRepo ModelCarRepo { get; }
  public IUserRepo UserRepo { get; }
  Task SaveChangesAsync();
  void Dispose();
}