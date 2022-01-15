namespace Backend.Api.GarageDtos;

public record GarageDto
{
  public Guid ModelGarageId { get; init; }

  public string Desc { get; init; }
}

public record SimplifiedGarageDto
{
  public Guid Id { get; init; }
  
  public string Name { get; init; }
  
  public string Desc { get; init; }
  
  public string Type { get; init; }
  
  public int Capacity { get; init; }
}