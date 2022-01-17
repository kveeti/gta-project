using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;

namespace Backend.Api.Helpers;

public interface IJwt
{
  public string Encode(string aUsername, string aRole, Guid aId, IOptions<Settings> aSettings);
  
  public JwtSecurityToken Decode(string aToken);

  public Guid GetUserId(string aToken);
}