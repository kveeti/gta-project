using System.Linq.Expressions;

namespace Backend.Api.Repositories;

public interface IGenericRepo<TEntity> where TEntity : class
{
  Task<IEnumerable<TEntity>> GetAll();

  Task<TEntity> GetOneNotJoinedByFilter(Expression<Func<TEntity, bool>> aFilter);
  
  Task<IEnumerable<TEntity>> GetManyNotJoinedByFilter(Expression<Func<TEntity, bool>> aFilter);
  
  void Add(TEntity aEntity);

  Task Save();

  void Delete(TEntity aEntity);

  Task Delete(Guid aId);
}