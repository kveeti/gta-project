using Backend.Api.GarageDtos;
using Backend.Api.ModelCarDtos;

namespace Backend.Api.CarDtos;

public record NewCarDto
{
  public Guid ModelCarId { get; init; }

  public Guid GarageId { get; set; }
}

public record SimplifiedCarDto : ModelCarDto
{
  public Guid Id { get; init; }

  public PartiallySimplifiedGarageDto Garage { get; init; }
}

