using Backend.Api.GarageDtos;

namespace Backend.Api.CarDtos;

public record NewCarDto
{
  public Guid ModelCarId { get; init; }
  public Guid GarageId { get; set; }
}

public record JoinedCarDto 
{
  public Guid Id { get; init; }
  public string Name { get; init; }
  public string Manufacturer { get; init; }
  public string Class { get; init; }
  public Guid OwnerId { get; init; }
  public PartialGarageDto Garage { get; init; }
}

public record ReturnCarDto
{
  public Guid Id { get; init; }
  public string Name { get; init; }
  public string Manufacturer { get; init; }
  public string Class { get; init; }
  public PartialGarageDto Garage { get; init; }
}

public record ReturnNotJoinedCarDto
{
  public Guid Id { get; init; }
  public Guid OwnerId { get; init; }
  public Guid GarageId { get; set; }
  public Guid ModelCarId { get; init; }
}
