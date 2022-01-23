using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Api.Models;
using Backend.Api.TokenDtos;
using Microsoft.Extensions.Options;

namespace Backend.Api.Helpers;

public class Jwt : IJwt
{
  private readonly IOptions<Settings> _settings;

  public Jwt(IOptions<Settings> aSettings)
  {
    _settings = aSettings;
  }

  public ValidTokenDto ValidateRefreshToken(string aToken)
  {
    if (aToken == null) return null;

    var handler = new JwtSecurityTokenHandler();
    var validationParams = new TokenValidationParameters()
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateIssuerSigningKey = true,
      ValidateLifetime = true,

      ValidIssuer = _settings.Value.JWT_Refresh_Iss,
      ValidAudience = _settings.Value.JWT_Refresh_Aud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.JWT_Refresh_Secret)),

      RequireAudience = true,
      RequireSignedTokens = true,
      RequireExpirationTime = true,
    };

    handler.ValidateToken(aToken, validationParams, out var validated);
    return ValidateExistenceOfClaimsRefreshToken(validated as JwtSecurityToken);
  }

  public ValidTokenDto ValidateAccessToken(string aToken)
  {
    if (aToken == null) return null;

    var handler = new JwtSecurityTokenHandler();
    var validationParams = new TokenValidationParameters()
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateIssuerSigningKey = true,

      ValidIssuer = _settings.Value.JWT_Access_Iss,
      ValidAudience = _settings.Value.JWT_Access_Aud,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.JWT_Access_Secret)),

      RequireAudience = true,
      RequireSignedTokens = true,

      RequireExpirationTime = false,
      ValidateLifetime = false
    };


    try
    {
      handler.ValidateToken(aToken, validationParams, out var validated);
      return ValidateExistenceOfClaimsAccessToken(validated as JwtSecurityToken);
    }
    catch
    {
      return null;
    }
  }

  public string CreateRefreshToken(User user)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new Claim(ClaimTypes.Role, user.Role),
      new Claim(ClaimTypes.Name, user.Username),
      new Claim(ClaimTypes.Email, user.Email),
      new Claim(ClaimTypes.Version, user.TokenVersion.ToString()),
    };

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.JWT_Refresh_Secret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      _settings.Value.JWT_Refresh_Iss,
      _settings.Value.JWT_Refresh_Aud,
      claims,
      expires: DateTime.Now.AddDays(7),
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  public string CreateAccessToken(User user)
  {
    var claims = new[]
    {
      new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
      new Claim(ClaimTypes.Role, user.Role),
      new Claim(ClaimTypes.Name, user.Username),
      new Claim(ClaimTypes.Email, user.Email),
      new Claim(ClaimTypes.Version, user.TokenVersion.ToString()),
      new Claim(ClaimTypes.Expiration, DateTimeOffset.Now.AddMinutes(15).ToUnixTimeSeconds().ToString())
    };

    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.JWT_Access_Secret));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
    var tokenDescriptor = new JwtSecurityToken(
      _settings.Value.JWT_Access_Iss,
      _settings.Value.JWT_Access_Aud,
      claims,
      signingCredentials: credentials);

    return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
  }

  private ValidTokenDto ValidateExistenceOfClaimsAccessToken(JwtSecurityToken token)
  {
    var expirationClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Expiration);
    var tokenVersionClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Version);
    var userIdClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
    var roleClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role);
    var usernameClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name);
    var emailClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email);

    if (expirationClaim == null)
      throw new Exception("token is missing its expiration");

    if (userIdClaim == null)
      throw new Exception("token is missing its user id");

    if (roleClaim == null)
      throw new Exception("token is missing its role");

    if (usernameClaim == null)
      throw new Exception("token is missing its username");

    if (tokenVersionClaim == null)
      throw new Exception("token is missing its version");
    
    if (emailClaim == null)
      throw new Exception("token is missing its email");

    return new()
    {
      Exp = long.Parse(expirationClaim.Value),
      Role = roleClaim.Value,
      UserId = Guid.Parse(userIdClaim.Value),
      Username = usernameClaim.Value,
      Email = emailClaim.Value,
      TokenVersion = int.Parse(tokenVersionClaim.Value)
    };
  }
  
  private ValidTokenDto ValidateExistenceOfClaimsRefreshToken(JwtSecurityToken token)
  {
    var tokenVersionClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Version);
    var userIdClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
    var roleClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role);
    var usernameClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name);
    var emailClaim = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email);

    if (userIdClaim == null)
      throw new Exception("token is missing its user id");

    if (roleClaim == null)
      throw new Exception("token is missing its role");

    if (usernameClaim == null)
      throw new Exception("token is missing its username");

    if (tokenVersionClaim == null)
      throw new Exception("token is missing its version");
    
    if (emailClaim == null)
      throw new Exception("token is missing its email");

    return new()
    {
      Role = roleClaim.Value,
      UserId = Guid.Parse(userIdClaim.Value),
      Username = usernameClaim.Value,
      Email = emailClaim.Value,
      TokenVersion = int.Parse(tokenVersionClaim.Value)
    };
  }
}