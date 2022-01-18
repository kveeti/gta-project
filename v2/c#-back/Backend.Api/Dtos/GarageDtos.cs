using Backend.Api.CarDtos;

namespace Backend.Api.GarageDtos;

public record NewGarageDto
{
  public Guid ModelGarageId { get; init; }
  public string Desc { get; init; }
}

public record JoinedGarageDto
{
  public Guid Id { get; init; }
  public string Desc { get; init; }
  public Guid OwnerId { get; init; }
  public string Name { get; init; }
  public int Capacity { get; init; }
  public string Type { get; init; }
  public IEnumerable<JoinedCarDto> Cars { get; init; }
}

public record PartialGarageDto
{
  public Guid Id { get; set; }
  public string Name { get; init; }
  public int Capacity { get; init; }
  public string Type { get; init; }
  public string Desc { get; init; }
}

public record ReturnGarageDto
{
  public Guid Id { get; init; }
  public string Desc { get; init; }
  public string Name { get; init; }
  public int Capacity { get; init; }
  public string Type { get; init; }
  public IEnumerable<JoinedCarDto> Cars { get; init; }
}

public record ReturnNotJoinedGarageDto
{
  public Guid Id { get; init; }
  public string Desc { get; init; }
  public Guid OwnerId { get; init; }
  public Guid ModelGarageId { get; init; }
}