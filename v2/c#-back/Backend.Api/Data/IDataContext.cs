using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Data;

public interface IDataContext
{
  DbSet<User> Users { get; set; }
  Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
