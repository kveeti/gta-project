using System;
using Backend.Api;
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

  private readonly IOptions<Settings> _testSettings = Options.Create<Settings>(
    new Settings()
    {
      JWT_Refresh_Secret = Guid.NewGuid().ToString(),
      JWT_Refresh_Iss = "test-refresh-iss",
      JWT_Refresh_Aud = "test-refresh-aud",

      JWT_Access_Secret = Guid.NewGuid().ToString(),
      JWT_Access_Iss = "test-access-iss",
      JWT_Access_Aud = "test-access-aud",

      RefreshTokenCookieName = "test-cookie",
      AccessTokenHeaderName = "test"
    });

  public UserControllerTests()
  {
    _jwt = new Jwt(_testSettings);
  }
  
  
}