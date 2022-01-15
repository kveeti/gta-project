using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Data;

public class DataContext : DbContext, IDataContext
{
  public DataContext(DbContextOptions<DataContext> aOptions) : base(aOptions)
  {
  }

  public DbSet<User> Users { get; set; }
  public DbSet<ModelCar> ModelCars { get; set; }

  public DbSet<ModelGarage> ModelGarages { get; set; }
  
  public DbSet<Garage> Garages { get; set; }

  protected override void OnModelCreating(ModelBuilder aBuilder)
  {
    aBuilder.Entity<User>(entity =>
      entity.HasIndex(e => e.Username).IsUnique()
    );
  }
}