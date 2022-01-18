using System.Linq.Expressions;
using Backend.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class GenericRepo<TEntity> : IGenericRepo<TEntity> where TEntity : class
{
  private readonly DataContext _context;
  private readonly DbSet<TEntity> _dbSet;

  public GenericRepo(DataContext context)
  {
    _context = context;
    _dbSet = context.Set<TEntity>();
  }

  public virtual async Task<IEnumerable<TEntity>> GetAll()
  {
    return await _dbSet.ToListAsync();
  }

  public virtual async Task<TEntity> GetOneByFilter(Expression<Func<TEntity, bool>> aFilter)
  {
    return await _dbSet.AsNoTracking().FirstOrDefaultAsync(aFilter);
  }
  
  public virtual async Task<IEnumerable<TEntity>> GetManyByFilter(Expression<Func<TEntity, bool>> aFilter)
  {
    return await _dbSet.AsNoTracking().Where(aFilter).ToListAsync();
  }
  
  public virtual async Task<IEnumerable<TEntity>> GetManyByFilterTracking(Expression<Func<TEntity, bool>> aFilter)
  {
    return await _dbSet.Where(aFilter).ToListAsync();
  }
  
  public virtual async Task<TEntity> GetOneByFilterTracking(Expression<Func<TEntity, bool>> aFilter)
  {
    return await _dbSet.FirstOrDefaultAsync(aFilter);
  }
  
  public virtual void Add(TEntity aEntity)
  {
    _dbSet.Add(aEntity);
  }

  public virtual void Delete(TEntity aEntity)
  {
    _dbSet.Remove(aEntity);
  }
  
  public virtual async Task Delete(Guid aId)
  {
    var toDelete = await _dbSet.FindAsync(aId);
    _dbSet.Remove(toDelete);
  }

  public virtual async Task Save()
  {
    await _context.SaveChangesAsync();
  }
}