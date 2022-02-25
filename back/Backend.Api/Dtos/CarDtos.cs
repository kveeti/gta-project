namespace Backend.Api.Dtos;

public record NewCarDto
{
  public IEnumerable<Guid> ModelCarIds { get; init; }
  public Guid GarageId { get; set; }
}

public record DeleteCarsDto
{
  public IEnumerable<Guid> carIds { get; init; }
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