namespace Backend.Api.TokenDtos;

public record ValidTokenDto
{
  public long Exp { get; init; }
  public Guid UserId { get; init; }
  public string Role { get; init; }
  public string Username { get; init; }
  public string Email { get; init; }
  public Guid TokenVersion { get; init; }
  
  public bool EmailVerified { get; init; }
}