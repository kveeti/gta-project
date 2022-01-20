namespace Backend.Api.Repositories.ModelGarage;

public interface IModelGarageRepo : IGenericRepo<Models.ModelGarage>
{
  public Task<IEnumerable<Models.ModelGarage>> GetMatching(string aQuery);
}