using Backend.Api.Configs;
using Microsoft.Extensions.Options;

namespace Backend.Api.Helpers;

public class Misc: IMisc
{
  private readonly IOptions<JwtConfig> _jwtConfig;

  public Misc(IOptions<JwtConfig> aJwtConfig)
  {
    _jwtConfig = aJwtConfig;
  }
  
  public string GenerateEmailConfirmationToken()
  {
    return $"{Guid.NewGuid().ToString()}-{Guid.NewGuid().ToString()}";
  }

  public string GeneratePasswordResetToken()
  {
    return $"{Guid.NewGuid().ToString()}-{Guid.NewGuid().ToString()}-{Guid.NewGuid().ToString()}-{Guid.NewGuid().ToString()}-{Guid.NewGuid().ToString()}";
  }
  
  public string HashGeneratedToken(string aClearText)
  {
    return Hashing.HmacSha256(aClearText, _jwtConfig.Value.Access_Secret);
  }
  
  public string CreateCookie(string aCookieValue)
  {
    return $"{CookieConfig.RefreshTokenCookie}={aCookieValue}; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age={604800};";
  }

  public string GetDeleteCookie()
  {
    return $"{CookieConfig.RefreshTokenCookie}=; SameSite=Strict; Secure; HttpOnly; Path=/api/auth/tokens; Max-Age=0;";
  }
}