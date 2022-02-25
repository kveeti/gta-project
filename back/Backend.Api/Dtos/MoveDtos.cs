namespace Backend.Api.Dtos;

public record MoveCarDto
{
  public Guid NewGarageId { get; init; }
  public IEnumerable<Guid> CarIds { get; init; }
}