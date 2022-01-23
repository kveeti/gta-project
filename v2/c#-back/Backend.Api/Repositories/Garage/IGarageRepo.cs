using System.Linq.Expressions;
using Backend.Api.GarageDtos;
using Backend.Api.Models;
using JetBrains.Annotations;

namespace Backend.Api.Repositories;

public interface IGarageRepo : IGenericRepo<Garage>
{
  public Task<IEnumerable<JoinedGarageDto>> GetMatching(Guid userId, [CanBeNull] string aQuery = null);
  public Task<IEnumerable<JoinedGarageDto>> GetManyJoinedByFilter(Expression<Func<JoinedGarageDto, bool>> aFilter);
  public Task<JoinedGarageDto> GetOneJoinedByFilter(Expression<Func<JoinedGarageDto, bool>> aFilter);
}