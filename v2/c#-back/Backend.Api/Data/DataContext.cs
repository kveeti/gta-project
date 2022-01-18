using Backend.Api.GarageDtos;
using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Data;

public class DataContext : DbContext, IDataContext
{
  public DataContext(DbContextOptions<DataContext> aOptions) : base(aOptions)
  {
  }

  protected override void OnModelCreating(ModelBuilder aBuilder)
  {
    aBuilder.Entity<User>(entity =>
      entity.HasIndex(e => e.Username).IsUnique()
    );
   
    aBuilder.Entity<Garage>()
      .HasMany<Car>(garage => garage.Cars)
      .WithOne(car => car.Garage)
      .HasForeignKey(car => car.GarageId)
      .OnDelete(DeleteBehavior.Cascade);

    aBuilder.Entity<ModelCar>()
      .HasMany<Car>(modelCar => modelCar.Cars)
      .WithOne(car => car.ModelCar)
      .HasForeignKey(car => car.ModelCarId)
      .OnDelete(DeleteBehavior.Cascade);
    
    aBuilder.Entity<ModelGarage>()
      .HasMany<Garage>(modelCar => modelCar.Garages)
      .WithOne(garage => garage.ModelGarage)
      .HasForeignKey(garage => garage.ModelGarageId)
      .OnDelete(DeleteBehavior.Cascade);

    aBuilder.Entity<User>()
      .HasMany<Car>(user => user.Cars)
      .WithOne(car => car.Owner)
      .HasForeignKey(car => car.OwnerId)
      .OnDelete(DeleteBehavior.Cascade);
    
    aBuilder.Entity<User>()
      .HasMany<Garage>(user => user.Garages)
      .WithOne(garage => garage.Owner)
      .HasForeignKey(garage => garage.OwnerId)
      .OnDelete(DeleteBehavior.Cascade);
  }
  
  public DbSet<User> Users { get; set; }
  
  public DbSet<ModelCar> ModelCars { get; set; }

  public DbSet<ModelGarage> ModelGarages { get; set; }
  
  public DbSet<Garage> Garages { get; set; }
  
  public DbSet<Car> Cars { get; set; }
}