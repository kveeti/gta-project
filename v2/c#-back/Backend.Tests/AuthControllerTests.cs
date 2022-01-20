using System;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Api;
using Backend.Api.Controllers;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using Backend.Api.TokenDtos;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Backend.Tests;

public class AuthControllerTests
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

  public AuthControllerTests()
  {
    _jwt = new Jwt(_testSettings);
  }

  [Fact]
  public async Task Register_WithUniqueUserName_SetsCorrectHeaders()
  {
    var registerDto = CreateFakeRegisterUser();

    var fakeContext = new DefaultHttpContext();

    var controller = new AuthController(_jwt, _testSettings, _fakeUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Register(registerDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString().Split("=")[1].Split(";")[0];
    var resAccessToken = fakeContext.Response.Headers[_testSettings.Value.AccessTokenHeaderName].ToString();

    var refreshToken = _jwt.ValidateRefreshToken(resRefreshToken);
    var accessToken = _jwt.ValidateAccessToken(resAccessToken);
    
    result.Result.Should().BeOfType<NoContentResult>();

    refreshToken.Email.Should().Be(registerDto.Email);
    refreshToken.Username.Should().Be(registerDto.Username);
    refreshToken.TokenVersion.Should().Be(1);
    refreshToken.Role.Should().Be("Standard");
    
    accessToken.Email.Should().Be(registerDto.Email);
    accessToken.Username.Should().Be(registerDto.Username);
    accessToken.TokenVersion.Should().Be(1);
    accessToken.Role.Should().Be("Standard");
  }
  
  [Fact]
  public async Task Register_WithTakenUsername_ReturnsConflict_DoesntSetHeaders()
  {
    var registerDto = CreateFakeRegisterUser();
    var existingUser = CreateFakeUser();

    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();

    var controller = new AuthController(_jwt, _testSettings, _fakeUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Register(registerDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[_testSettings.Value.AccessTokenHeaderName];

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();
    
    result.Result.Should().BeOfType<ConflictObjectResult>();
    (result.Result as ConflictObjectResult).Value
      .Should().Be("Username taken");
  }
  
  [Fact]
  public async Task Login_WithCorrectCredentials_AndExistingUser_SetsCorrectHeaders()
  {
    var clearText = Guid.NewGuid().ToString();
    var hash = Hashing.HashToString(clearText);
    
    var authDto = CreateFakeAuthUser(clearText);
    User existingUser = new()
    {
      Id = Guid.NewGuid(),
      Email = Guid.NewGuid().ToString(),
      Username = authDto.Username,
      Password = hash,
      Role = Guid.NewGuid().ToString(),
      TokenVersion = _randomNum,
    };
    
    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();

    var controller = new AuthController(_jwt, _testSettings, _fakeUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(authDto);
    
    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString().Split("=")[1].Split(";")[0];
    var resAccessToken = fakeContext.Response.Headers[_testSettings.Value.AccessTokenHeaderName].ToString();

    var refreshToken = _jwt.ValidateRefreshToken(resRefreshToken);
    var accessToken = _jwt.ValidateAccessToken(resAccessToken);
    
    result.Result.Should().BeOfType<NoContentResult>();

    refreshToken.Email.Should().Be(existingUser.Email);
    refreshToken.Username.Should().Be(authDto.Username);
    refreshToken.TokenVersion.Should().Be(existingUser.TokenVersion);
    refreshToken.Role.Should().Be(existingUser.Role);
    
    accessToken.Email.Should().Be(existingUser.Email);
    accessToken.Username.Should().Be(authDto.Username);
    accessToken.TokenVersion.Should().Be(existingUser.TokenVersion);
    accessToken.Role.Should().Be(existingUser.Role);
  }
  
  [Fact]
  public async Task Login_WithUserNotFound_ReturnsNotFound_DoesntSetHeaders()
  {
    
    var authDto = CreateFakeAuthUser(Guid.NewGuid().ToString());
    
    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    var fakeContext = new DefaultHttpContext();

    var controller = new AuthController(_jwt, _testSettings, _fakeUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(authDto);
    
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[_testSettings.Value.AccessTokenHeaderName];

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();

    result.Result.Should().BeOfType<NotFoundObjectResult>();
    (result.Result as NotFoundObjectResult).Value.Should().Be("user not found");
  }
  
  [Fact]
  public async Task Login_WithIncorrectCredentials_ReturnsUnauthorized_DoesntSetHeaders()
  {
    
    var authDto = CreateFakeAuthUser(Guid.NewGuid().ToString());
    User existingUser = new()
    {
      Id = Guid.NewGuid(),
      Email = Guid.NewGuid().ToString(),
      Username = authDto.Username,
      Password = Hashing.HashToString(Guid.NewGuid().ToString()),
      Role = Guid.NewGuid().ToString(),
      TokenVersion = _randomNum,
    };
    
    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();

    var controller = new AuthController(_jwt, _testSettings, _fakeUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(authDto);
    
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[_testSettings.Value.AccessTokenHeaderName];

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();

    result.Result.Should().BeOfType<UnauthorizedObjectResult>();
    (result.Result as UnauthorizedObjectResult).Value.Should().Be("incorrect credentials");
  }
  
  [Fact]
  public async Task Logout_ResetsHeaders()
  {
    var fakeContext = new DefaultHttpContext();

    var controller = new AuthController(_jwt, _testSettings, _fakeUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    fakeContext.Response.Headers.SetCookie = $"{_testSettings.Value.RefreshTokenCookieName}={Guid.NewGuid().ToString()}; SameSite=Lax; Secure; HttpOnly; Path=/; Max-Age={604800};";
    fakeContext.Response.Headers[_testSettings.Value.AccessTokenHeaderName] = Guid.NewGuid().ToString();
    
    var result = controller.Logout();

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString();
    var resAccessToken = fakeContext.Response.Headers[_testSettings.Value.AccessTokenHeaderName].ToString();

    resRefreshToken.Should().Be("");
    resAccessToken.Should().Be("");

    result.Should().BeOfType<NoContentResult>();
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
      TokenVersion = _randomNum,
    };
  }
  private static AuthUserDto CreateFakeAuthUser(string password)
  {
    return new()
    {
      Username = Guid.NewGuid().ToString(),
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