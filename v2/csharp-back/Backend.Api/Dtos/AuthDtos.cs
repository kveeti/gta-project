namespace Backend.Api.Dtos;

public record InitPasswordResetDto
{
  public string Email { get; init; }
}

public record PasswordResetDto
{
  public string NewPassword { get; init; }
  public string PasswordResetToken { get; init; }
}

