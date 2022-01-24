using Backend.Api.CarDtos;

namespace Backend.Api.GarageDtos;

public record NewGarageDto
{
  public Guid ModelGarageId { get; init; }
  public string Desc { get; init; }
}

public record UpdateGarageDto
{
  public string NewDesc { get; init; }
}

public record PartialGarageDto
{
  public Guid Id { get; set; }
  public string Name { get; init; }
  public string Desc { get; init; }
  public int Capacity { get; init; }
  public bool Full { get; init; }
  public int Room { get; init; }
}

public record JoinedGarageDto : PartialGarageDto
{
  public Guid OwnerId { get; init; }
  public IEnumerable<JoinedCarDto> Cars { get; init; }
}