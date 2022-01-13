using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public interface IDataContext
{
    DbSet<User> Users { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
