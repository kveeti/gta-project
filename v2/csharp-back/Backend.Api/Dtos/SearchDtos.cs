namespace Backend.Api.Dtos;

public record SearchDto
{
  public IEnumerable<JoinedGarageDto> Garages { get; init; }
  public IEnumerable<JoinedCarDto> Cars { get; init; }
}