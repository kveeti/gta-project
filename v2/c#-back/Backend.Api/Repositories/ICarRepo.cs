using System.Linq.Expressions;
using Backend.Api.CarDtos;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface ICarRepo : IGenericRepo<Car>
{
  public Task<IEnumerable<JoinedCarDto>> GetManyJoinedByFilter(Expression<Func<JoinedCarDto, bool>> aFilter);
  public Task<JoinedCarDto> GetOneJoinedByFilter(Expression<Func<JoinedCarDto, bool>> aFilter);
}