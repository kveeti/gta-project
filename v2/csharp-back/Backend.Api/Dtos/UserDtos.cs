namespace Backend.Api.Dtos.UserDtos;

public record AuthUserDto
{
  public string Username { get; init; }
  public string Password { get; init; }
}

public record RegisterUserDto
{
  public string Username { get; init; }
  public string Email { get; init; }
  public string Password { get; init; }
}

public record UpdateUserDto
{
  public string NewRole { get; init; }
}

public record ReturnUserDto
{
  public Guid Id { get; init; }
  public string Email { get; init; }
  public bool EmailVerified { get; init; }
  public string Username { get; init; }
  public string Role { get; init; }
  public int CarCount { get; init; }
  public int GarageCount { get; init; }
}