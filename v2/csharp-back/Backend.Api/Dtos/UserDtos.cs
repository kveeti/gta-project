using Backend.Api.Models;
namespace Backend.Api.Dtos;

public record AuthUserDto
{
  public string UsernameOrEmail { get; init; }
  public string Password { get; init; }
}

public record RegisterUserDto
{
  public string Username { get; init; }
  public string Email { get; init; }
  public string Password { get; init; }
  public bool IsTestAccount { get; init; }
}

public record ChangePasswordDto
{
  public string CurrentPassword { get; init; }

  public string NewPassword { get; init; }
}

public record UpdateUserDto
{
  public string NewRole { get; init; }
}

public record DeleteUserDto
{
  public string Password { get; init; }
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
  public IEnumerable<JoinedCarDto> Cars { get; init; }
  public IEnumerable<JoinedGarageDto> Garages { get; init; }
  public bool IsTestAccount { get; init; }
}