using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface IModelGarageRepo
{
  public Task<IEnumerable<ModelGarage>> GetAll();

  public Task<ModelGarage> GetById(Guid aId);

  public Task<ModelGarage> GetByName(string aName);

  public Task Add(ModelGarage modelGarage);

  public Task Update();
}