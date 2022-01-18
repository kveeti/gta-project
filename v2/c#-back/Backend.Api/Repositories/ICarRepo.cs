using System.Linq.Expressions;
using Backend.Api.CarDtos;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface ICarRepo : IGenericRepo<Car>
{
  public Task<IEnumerable<JoinedCarDto>> GetManyByFilter(Expression<Func<JoinedCarDto, bool>> aFilter);
  
  public Task<JoinedCarDto> GetOneByFilter(Expression<Func<JoinedCarDto, bool>> aFilter);

  public Task<IEnumerable<Car>> GetManyNotJoinedById(Expression<Func<Car, bool>> aFilter);
}