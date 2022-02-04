namespace Backend.Api.Dtos;

public record ModelGarageDto
{
  public string Name { get; init; }
  public int Capacity { get; init; }
}

public record ReturnModelGarageDto : ModelGarageDto
{
  public Guid Id { get; init; }
  public bool AlreadyOwned { get; init; }
}