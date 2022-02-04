namespace Backend.Api.Dtos;

public record ModelCarDto
{
  public string Name { get; init; }
  public string Manufacturer { get; init; }
  public string Class { get; init; }
  public string Link { get; init; }
}