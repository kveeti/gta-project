using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;

namespace Backend.Api.Helpers;

internal static class Jwt
{
  public static string Encode(string aUsername, string aRole, Guid aId, IOptions<Settings> aSettings)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, aId.ToString()),
      new Claim(ClaimTypes.Role, aRole),
      new Claim(ClaimTypes.Name, aUsername)
    };

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(aSettings.Value.JWT_Secret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(aSettings.Value.JWT_Iss, aSettings.Value.JWT_Aud, claims,
      expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public static JwtSecurityToken Decode(string aToken)
  {
    var handler = new JwtSecurityTokenHandler();
    var jwtToken = handler.ReadJwtToken(aToken);

    return jwtToken;
  }

  public static Guid GetUserId(HttpContext context)
  {
    var jwt = context.Request.Headers.Authorization.ToString().Split(" ")[1];

    var decoded = Jwt.Decode(jwt);
    var userIdClaim = decoded.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    
    return Guid.Parse(userIdClaim.Value);
  }
}