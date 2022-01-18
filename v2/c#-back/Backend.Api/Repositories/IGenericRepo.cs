using System.Linq.Expressions;

namespace Backend.Api.Repositories;

public interface IGenericRepo<TEntity> where TEntity : class
{
  public Task<IEnumerable<TEntity>> GetAll();

  public Task<TEntity> GetOneByFilter(Expression<Func<TEntity, bool>> aFilter);
  
  public Task<IEnumerable<TEntity>> GetManyByFilter(Expression<Func<TEntity, bool>> aFilter);

  public Task<IEnumerable<TEntity>> GetManyByFilterTracking(Expression<Func<TEntity, bool>> aFilter);
  
  public Task<TEntity> GetOneByFilterTracking(Expression<Func<TEntity, bool>> aFilter);
  
  void Add(TEntity aEntity);

  Task Save();

  void Delete(TEntity aEntity);

  Task Delete(Guid aId);
}