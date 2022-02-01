using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Api.Configs;
using Backend.Api.Controllers;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
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
  private readonly Mock<IGenericRepo<User>> _fakeUserRepo = new();
  private readonly Mock<IMailing> _fakeMailing = new();

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


  public AuthControllerTests()
  {
    _jwt = new Jwt(_jwtConfig);
  }

  [Fact]
  public async Task Register_WithUniqueUserName_SetsCorrectHeaders()
  {
    var registerDto = CreateFakeRegisterUser();

    _fakeMailing.Setup(mailing => mailing
      .SendEmailConfirmation(
        It.IsAny<string>(),
        It.IsAny<string>())
    ).Verifiable();

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Register(registerDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString().Split("=")[1].Split(";")[0];
    var resAccessToken = fakeContext.Response.Headers[CookieConfig.AccessTokenHeader].ToString();

    var refreshToken = _jwt.ValidateRefreshToken(resRefreshToken);
    var accessToken = _jwt.ValidateAccessToken(resAccessToken);

    result.Result.Should().BeOfType<NoContentResult>();

    refreshToken.Email.Should().Be(registerDto.Email);
    refreshToken.Username.Should().Be(registerDto.Username);
    refreshToken.TokenVersion.Should().NotBeEmpty();
    refreshToken.Role.Should().Be("Standard");

    accessToken.Email.Should().Be(registerDto.Email);
    accessToken.Username.Should().Be(registerDto.Username);
    accessToken.TokenVersion.Should().NotBeEmpty();
    accessToken.Role.Should().Be("Standard");
  }

  [Fact]
  public async Task Register_WithTakenUsername_ReturnsConflict_DoesntSetHeaders()
  {
    var registerDto = CreateFakeRegisterUser();
    var existingUser = CreateFakeUser();

    _fakeMailing.Setup(mailing => mailing
      .SendEmailConfirmation(
        It.IsAny<string>(),
        It.IsAny<string>())
    ).Verifiable();

    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Register(registerDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[CookieConfig.AccessTokenHeader];

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
      TokenVersion = Guid.NewGuid(),
    };

    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(authDto);

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString().Split("=")[1].Split(";")[0];
    var resAccessToken = fakeContext.Response.Headers[CookieConfig.AccessTokenHeader].ToString();

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
      .ReturnsAsync((User)null);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(authDto);

    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[CookieConfig.AccessTokenHeader];

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();

    result.Result.Should().BeOfType<BadRequestObjectResult>();
    (result.Result as BadRequestObjectResult).Value.Should().Be("Incorrect credentials");
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
      TokenVersion = Guid.NewGuid(),
    };

    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(authDto);

    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[CookieConfig.AccessTokenHeader];

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();

    result.Result.Should().BeOfType<BadRequestObjectResult>();
    (result.Result as BadRequestObjectResult).Value.Should().Be("Incorrect credentials");
  }

  [Fact]
  public async Task Logout_ResetsHeaders()
  {
    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
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