using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface IModelCarRepo
{
  public Task<IEnumerable<ModelCar>> GetAll();
  
  public Task<ModelCar> GetById(Guid id);

  public Task<ModelCar> GetByName(string name);

  public Task Add(ModelCar modelCar);

  public Task Update();
}