using Backend.Api.CarDtos;
using Backend.Api.GarageDtos;

namespace Backend.Api.SearchDtos;

public record SearchDto
{
  public IEnumerable<SimplifiedGarageDto> Garages { get; init; }
  
  public IEnumerable<SimplifiedCarDto> Cars { get; init; }
}