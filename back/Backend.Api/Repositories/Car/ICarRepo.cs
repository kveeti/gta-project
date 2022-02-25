using System.Linq.Expressions;
using Backend.Api.Dtos;
using Backend.Api.Models;
using JetBrains.Annotations;

namespace Backend.Api.Repositories;

public interface ICarRepo : IGenericRepo<Car>
{
  public Task<IEnumerable<JoinedCarDto>> GetMatching(Guid userId, [CanBeNull] string aQuery = null);
  public Task<IEnumerable<JoinedCarDto>> GetManyJoinedByFilter(Expression<Func<JoinedCarDto, bool>> aFilter);
  public Task<JoinedCarDto> GetOneJoinedByFilter(Expression<Func<JoinedCarDto, bool>> aFilter);
}