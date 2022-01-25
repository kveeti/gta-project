namespace Backend.Api.EmailDtos;

public record ChangeEmailDto
{
  public Guid UserId { get; init; }
  public string NewEmail { get; init; }
}

public record VerifyEmailDto
{
  public string Token { get; init; }
}