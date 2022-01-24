using Backend.Api.CarDtos;
using Backend.Api.GarageDtos;

namespace Backend.Api.SearchDtos;

public record SearchDto
{
  public IEnumerable<JoinedGarageDto> Garages { get; init; }
  public IEnumerable<JoinedCarDto> Cars { get; init; }
}