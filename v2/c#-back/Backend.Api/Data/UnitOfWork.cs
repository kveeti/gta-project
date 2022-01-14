using Backend.Api.Repositories;

namespace Backend.Api.Data;

public class UnitOfWork : IUnitOfWork, IDisposable
{
  private readonly DataContext _context;

  public UnitOfWork(DataContext context, IUserRepo userRepo, IModelCarRepo modelCarRepo)
  {
    _context = context;
    UserRepo = userRepo;
    ModelCarRepo = modelCarRepo;
  }

  public IUserRepo UserRepo { get; }

  public IModelCarRepo ModelCarRepo { get; }

  public async Task SaveChangesAsync()
  {
    await _context.SaveChangesAsync();
  }

  private bool _disposed = false;

  private void Dispose(bool disposing)
  {
    if (!_disposed)
    {
      if (disposing) _context.Dispose();
    }

    _disposed = true;
  }

  public void Dispose()
  {
    Dispose(true);
    GC.SuppressFinalize(this);
  }
}