using System.Linq.Expressions;
using Backend.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class GenericRepo<TEntity> : IGenericRepo<TEntity> where TEntity : class
{
  private DataContext _context;
  private readonly DbSet<TEntity> _dbSet;

  public GenericRepo(DataContext context)
  {
    _context = context;
    _dbSet = context.Set<TEntity>();
  }

  public virtual IEnumerable<TEntity> GetSet()
  {
    return _dbSet;
  }
  
  public virtual async Task<IEnumerable<TEntity>> GetAll()
  {
    IQueryable<TEntity> query = _dbSet;

    return await query.ToListAsync();
  }

  public virtual async Task<TEntity> GetOneByFilter(Expression<Func<TEntity, bool>> aFilter)
  {
    IQueryable<TEntity> query = _dbSet;

    return await query.Where(aFilter).FirstOrDefaultAsync();
  }

  public virtual async Task<IEnumerable<TEntity>> GetManyByFilter(Expression<Func<TEntity, bool>> aFilter)
  {
    IQueryable<TEntity> query = _dbSet;

    return await query.Where(aFilter).ToListAsync();
  }
  
  public virtual void Add(TEntity aEntity)
  {
    _dbSet.Add(aEntity);
  }

  public virtual void Delete(TEntity aEntity)
  {
    _dbSet.Remove(aEntity);
  }

  public virtual async Task Save()
  {
    await _context.SaveChangesAsync();
  }
}