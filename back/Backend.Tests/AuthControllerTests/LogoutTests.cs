using System;
using System.Threading.Tasks;
using Backend.Api.Configs;
using Backend.Api.Controllers;
using Backend.Api.Dtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Backend.Tests.AuthControllerTests;

public class LogoutTests
{
  private readonly IJwt _jwt;
  private readonly IMisc _fakeMisc;
  private readonly Mock<IMailing> _fakeMailing = new();
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

  public LogoutTests()
  {
    _jwt = new Jwt(_jwtConfig);
    _fakeMisc = new Misc(_jwtConfig);
  }

  [Fact]
  public async Task Logout_ResetsHeaders()
  {
    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_jwt, _fakeMisc, _fakeMailing.Object, _fakeUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    fakeContext.Response.Headers.SetCookie.ToString().Contains($"{CookieConfig.RefreshTokenCookie}=;");
    fakeContext.Response.Headers[CookieConfig.AccessTokenHeader] = Guid.NewGuid().ToString();

    var result = controller.Logout();

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString();
    var resAccessToken = fakeContext.Response.Headers[CookieConfig.AccessTokenHeader].ToString();

    resRefreshToken.Should().StartWith($"{CookieConfig.RefreshTokenCookie}=;");
    resAccessToken.Should().Be("");

    result.Should().BeOfType<Task<NoContentResult>>();
  }

  private User CreateFakeUser(string? hash = null)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Email = Guid.NewGuid().ToString(),
      Username = Guid.NewGuid().ToString(),
      Password = hash ?? Hashing.HashToString(Guid.NewGuid().ToString()),
      Role = Guid.NewGuid().ToString(),
      TokenVersion = Guid.NewGuid(),
    };
  }

  private static AuthUserDto CreateFakeAuthUser(string password)
  {
    return new()
    {
      UsernameOrEmail = Guid.NewGuid().ToString(),
      Password = password
    };
  }

  private static RegisterUserDto CreateFakeRegisterUser()
  {
    return new()
    {
      Email = Guid.NewGuid().ToString(),
      Username = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
    };
  }
}