using System.Linq.Expressions;

namespace Backend.Api.Repositories;

public interface IGenericRepo<TEntity> where TEntity : class
{
  Task<IEnumerable<TEntity>> GetAll();

  Task<TEntity> GetOneByFilter(Expression<Func<TEntity, bool>> aFilter);
  
  Task<IEnumerable<TEntity>> GetManyByFilter(Expression<Func<TEntity, bool>> aFilter);

  void Add(TEntity aEntity);

  Task Save();

  void Delete(TEntity aEntity);
}