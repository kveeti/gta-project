namespace Backend.Api.Helpers;

public static class Cookie
{
  public static string CreateCookie(string aCookieName, string aCookieValue)
  {
    return $"{aCookieName}={aCookieValue}; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age={604800};";
  }

  public static string GetDeleteCookie(string aCookieName)
  {
    return $"{aCookieName}=; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age=0;";
  }
}