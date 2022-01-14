using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Data;

public class DataContext : DbContext, IDataContext
{
  public DataContext(DbContextOptions<DataContext> options) : base(options)
  {
  }

  public DbSet<User> Users { get; set; }
  public DbSet<ModelCar> ModelCars { get; set; }

  public DbSet<ModelGarage> ModelGarages { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    builder.Entity<User>(entity =>
      entity.HasIndex(e => e.Username).IsUnique()
    );
  }
}