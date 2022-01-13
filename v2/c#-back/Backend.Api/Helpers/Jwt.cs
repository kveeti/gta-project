using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;

namespace Backend.Api.Helpers;

internal static class Jwt
{
  public static string Encode(string username, string role, IOptions<Settings> settings)
  {
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, username),
        new Claim(ClaimTypes.Role, role)
    };

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.Value.JWT_Secret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(settings.Value.JWT_Iss, settings.Value.JWT_Aud, claims,
        expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public static JwtSecurityToken Decode(string token)
  {
      var handler = new JwtSecurityTokenHandler();
      var jwtToken = handler.ReadJwtToken(token);

      return jwtToken;
  }
}
