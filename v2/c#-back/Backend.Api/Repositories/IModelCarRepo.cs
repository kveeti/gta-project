using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface IModelCarRepo
{
  public Task<IEnumerable<ModelCar>> GetAll();
  
  public Task<ModelCar> GetById(Guid aId);

  public Task<ModelCar> GetByName(string aName);

  public Task Add(ModelCar aModelCar);

  public Task Update();
}