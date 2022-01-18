using System.Linq.Expressions;
using Backend.Api.GarageDtos;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface IGarageRepo : IGenericRepo<Garage>
{
  public Task<IEnumerable<JoinedGarageDto>> GetManyByFilter(Expression<Func<JoinedGarageDto, bool>> aFilter);

  public Task<JoinedGarageDto> GetOneByFilter(Expression<Func<JoinedGarageDto, bool>> aFilter);
}