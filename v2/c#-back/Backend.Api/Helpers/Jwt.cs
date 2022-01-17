using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;

namespace Backend.Api.Helpers;
public class Jwt : IJwt
{
  public string Encode(string aUsername, string aRole, Guid aId, IOptions<Settings> aSettings)
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
      expires: DateTime.Now.AddMinutes(900), signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public JwtSecurityToken Decode(string aToken)
  {
    var handler = new JwtSecurityTokenHandler();
    var jwtToken = handler.ReadJwtToken(aToken);

    return jwtToken;
  }

  public Guid GetUserId(string aToken)
  {
    var decoded = Decode(aToken);
    var userIdClaim = decoded.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    
    return Guid.Parse(userIdClaim.Value);
  }
}