using System.IdentityModel.Tokens.Jwt;
using Backend.Api.Models;
using Backend.Api.TokenDtos;

namespace Backend.Api.Helpers;

public interface IJwt
{
  public ValidTokenDto ValidateRefreshToken(string aToken);
  public ValidTokenDto ValidateAccessToken(string aToken);

  public string CreateRefreshToken(User user);
  public string CreateAccessToken(User user);
  public JwtSecurityToken Decode(string aToken);

  public Guid GetUserId(string aToken);
}