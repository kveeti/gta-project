using Backend.Api.Models;
using Backend.Api.TokenDtos;

namespace Backend.Api.Helpers;

public interface IJwt
{
  public ValidTokenDto ValidateRefreshToken(string aToken);
  public ValidTokenDto ValidateAccessToken(string aToken);
  public string CreateRefreshToken(User user);
  public string CreateAccessToken(User user);
}