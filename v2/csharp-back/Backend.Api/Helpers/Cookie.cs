namespace Backend.Api.Helpers;

public static class Cookie
{
  public static string CreateCookie(string aCookieValue)
  {
    return $"refresh-token={aCookieValue}; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age={604800};";
  }

  public static string GetDeleteCookie()
  {
    return $"refresh-token=; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age=0;";
  }
}