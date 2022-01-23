namespace Backend.Api.Repositories.ModelCar;

public interface IModelCarRepo : IGenericRepo<Models.ModelCar>
{
  public Task<IEnumerable<Models.ModelCar>> GetMatching(string aQuery);
}