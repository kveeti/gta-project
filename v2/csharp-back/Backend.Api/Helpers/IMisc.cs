namespace Backend.Api.Helpers;

public interface IMisc
{ 
  public string GenerateEmailConfirmationToken();
  public string HashGeneratedToken(string aClearText);
  public string GeneratePasswordResetToken();
  public string CreateCookie(string aCookieValue);
  public string GetDeleteCookie();
}