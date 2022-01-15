using Backend.Api.Models;
using Backend.Api.Repositories;

namespace Backend.Api.Data;

public interface IUnitOfWork
{
  public IGenericRepo<ModelCar> ModelCarRepo { get; }
  
  public IGenericRepo<ModelGarage> ModelGarageRepo { get; }
  
  public IGenericRepo<User> UserRepo { get; }
  
  public IGenericRepo<Garage> GarageRepo { get; }
  
  public IGenericRepo<Car> CarRepo { get; }

  public Task SaveChangesAsync();
}