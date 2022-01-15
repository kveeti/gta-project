namespace Backend.Api.GarageDtos;

public record GarageDto
{
  public Guid Id { get; init; }
  
  public Guid ModelGarageId { get; init; }

  public Guid OwnerId { get; set; }

  public string Desc { get; set; }
}