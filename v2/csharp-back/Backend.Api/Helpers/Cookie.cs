using Backend.Api.Configs;
namespace Backend.Api.Helpers;

public static class Cookie
{
  public static string CreateCookie(string aCookieValue)
  {
    return $"{CookieConfig.RefreshTokenCookie}={aCookieValue}; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age={604800};";
  }

  public static string GetDeleteCookie()
  {
    return $"{CookieConfig.RefreshTokenCookie}=; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age=0;";
  }
}