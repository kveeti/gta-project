namespace Backend.Api.MoveDtos;

public record MoveCarDto
{
  public Guid NewGarageId { get; init; }
  public IEnumerable<Guid> CarIds { get; init; }
}