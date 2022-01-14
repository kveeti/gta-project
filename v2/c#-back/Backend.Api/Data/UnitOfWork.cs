using Backend.Api.Repositories;

namespace Backend.Api.Data;

public class UnitOfWork : IUnitOfWork, IDisposable
{
  private readonly DataContext _context;

  public UnitOfWork(DataContext aContext, IUserRepo aUserRepo, IModelCarRepo aModelCarRepo)
  {
    _context = aContext;
    UserRepo = aUserRepo;
    ModelCarRepo = aModelCarRepo;
  }

  public IUserRepo UserRepo { get; }

  public IModelCarRepo ModelCarRepo { get; }

  public async Task SaveChangesAsync()
  {
    await _context.SaveChangesAsync();
  }

  private bool _disposed = false;

  private void Dispose(bool aDisposing)
  {
    if (!_disposed)
    {
      if (aDisposing) _context.Dispose();
    }

    _disposed = true;
  }

  public void Dispose()
  {
    Dispose(true);
    GC.SuppressFinalize(this);
  }
}