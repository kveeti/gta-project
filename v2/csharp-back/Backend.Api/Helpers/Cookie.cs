namespace Backend.Api.Helpers;

public static class Cookie
{
  public static string CreateCookie(string aCookieName, string aCookieValue)
  {
    return $"{aCookieName}={aCookieValue}; SameSite=Lax; Secure; HttpOnly; Path=/; Max-Age={604800};";
  }
}