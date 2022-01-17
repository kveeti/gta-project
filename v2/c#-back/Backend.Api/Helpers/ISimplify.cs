using Backend.Api.CarDtos;
using Backend.Api.GarageDtos;
using Backend.Api.Models;

namespace Backend.Api.Helpers;

public interface ISimplify
{
  public Task<IEnumerable<SimplifiedCarDto>> GetSimplifiedCarsForUser(Guid aUserId);

  public Task<IEnumerable<SimplifiedGarageDto>> GetSimplifiedGaragesForUser(Guid aUserId);

  public Task<SimplifiedGarageDto> GetOneSimplifiedGarage(Garage garage);
  
  public Task<SimplifiedCarDto> GetOneSimplifiedCar(Car car);
}