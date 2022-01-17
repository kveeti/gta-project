using Backend.Api.CarDtos;
using Backend.Api.ModelGarageDtos;

namespace Backend.Api.GarageDtos;

public record NewGarageDto
{
  public Guid ModelGarageId { get; init; }

  public string Desc { get; init; }
}

public record SimplifiedGarageDto : ModelGarageDto
{
  public Guid Id { get; init; }
  
  public string Desc { get; init; }
  
  public IEnumerable<SimplifiedCarDto> Cars { get; init; }
}

public record PartiallySimplifiedGarageDto : ModelGarageDto
{
  public Guid Id { get; init; }
  
  public string Desc { get; init; }
}