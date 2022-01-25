using System;
using Backend.Api.Configs;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Microsoft.Extensions.Options;
using Moq;

namespace Backend.Tests;

public class UserControllerTests
{
  private readonly IJwt _jwt;
  private readonly int _randomNum = new Random().Next(20);
  private readonly Mock<IGenericRepo<User>> _fakeUserRepo = new();

  private readonly IOptions<JwtConfig> _jwtConfig = Options.Create<JwtConfig>(
    new JwtConfig()
    {
      Refresh_Secret = Guid.NewGuid().ToString(),
      Refresh_Iss = "test-refresh-iss",
      Refresh_Aud = "test-refresh-aud",
      
      Access_Secret = Guid.NewGuid().ToString(),
      Access_Iss = "test-access-iss",
      Access_Aud = "test-access-aud"
    });
  
  private readonly IOptions<CookieConfig> _cookieConfig = Options.Create <CookieConfig>(
    new CookieConfig()
    {
      RefreshTokenCookieName = "test-cookie",
      AccessTokenHeaderName = "test"
    });


  public UserControllerTests()
  {
    _jwt = new Jwt(_jwtConfig);
  }
  
  
}