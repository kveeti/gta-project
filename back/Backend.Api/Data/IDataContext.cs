using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Data;

public interface IDataContext
{
  DbSet<User> Users { get; set; }
  DbSet<ModelCar> ModelCars { get; set; }
  DbSet<ModelGarage> ModelGarages { get; set; }
  DbSet<Garage> Garages { get; set; }
  public DbSet<Car> Cars { get; set; }

  Task<int> SaveChangesAsync(CancellationToken aCancellationToken = default);
}