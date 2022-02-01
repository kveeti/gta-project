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

namespace Backend.Tests.AuthControllerTests;

public class PasswordTests
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


  public PasswordTests()
  {
    _jwt = new Jwt(_jwtConfig);
  }

  [Fact]
  public async Task ChangePassword_EverythingCorrect_SetsCorrectHeaders()
  {
    var userId = Guid.NewGuid();
    var password = Guid.NewGuid().ToString();
    var newPassword = Guid.NewGuid().ToString();

    User existingUser = new()
    {
      Id = userId,
      Email = Guid.NewGuid().ToString(),
      Username = Guid.NewGuid().ToString(),
      Password = Hashing.HashToString(password),
      Role = Guid.NewGuid().ToString(),
      TokenVersion = Guid.NewGuid(),
      EmailVerifyToken = null,
      IsTestAccount = false
    };

    var dto = new ChangePasswordDto()
    {
      CurrentPassword = password,
      NewPassword = newPassword
    };

    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilterTracking(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    _fakeUserRepo.Setup(repo => repo
        .Save())
      .Verifiable();

    _fakeMailing.Setup(repo => repo
        .SendPasswordChanged(It.IsAny<string>()))
      .Verifiable();

    var fakeContext = new DefaultHttpContext();
    fakeContext.Items["userId"] = existingUser.Id;

    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.ChangePassword(dto);

    _fakeMailing.Verify(exps => exps
      .SendPasswordChanged(It.IsAny<string>()), Times.Once());

    _fakeUserRepo.Verify(exps => exps
      .Save(), Times.Once());

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString().Split("=")[1].Split(";")[0];
    var resAccessToken = fakeContext.Response.Headers[CookieConfig.AccessTokenHeader].ToString();

    var refreshToken = _jwt.ValidateRefreshToken(resRefreshToken);
    var accessToken = _jwt.ValidateAccessToken(resAccessToken);

    result.Result.Should().BeOfType<NoContentResult>();

    refreshToken.Email.Should().Be(existingUser.Email);
    refreshToken.Username.Should().Be(existingUser.Username);
    refreshToken.TokenVersion.Should().Be(existingUser.TokenVersion);
    refreshToken.Role.Should().Be(existingUser.Role);
    refreshToken.EmailVerified.Should().Be(true);
    refreshToken.IsTestAccount.Should().Be(false);

    accessToken.Email.Should().Be(existingUser.Email);
    accessToken.Username.Should().Be(existingUser.Username);
    accessToken.TokenVersion.Should().Be(existingUser.TokenVersion);
    accessToken.Role.Should().Be(existingUser.Role);
    accessToken.EmailVerified.Should().Be(true);
    accessToken.IsTestAccount.Should().Be(false);
  }

  [Fact]
  public async Task ChangePassword_WithNoExistingUser_ReturnsBadRequest()
  {
    var userId = Guid.NewGuid();
    var password = Guid.NewGuid().ToString();
    var newPassword = Guid.NewGuid().ToString();

    var dto = new ChangePasswordDto()
    {
      CurrentPassword = password,
      NewPassword = newPassword
    };

    _fakeUserRepo.Setup(repo => repo
        .GetOneByFilterTracking(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User)null);

    var fakeContext = new DefaultHttpContext();
    fakeContext.Items["userId"] = userId;

    var controller = new AuthController(_jwt, _fakeMailing.Object, _fakeUserRepo.Object, _jwtConfig)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.ChangePassword(dto);

    result.Result.Should().BeOfType<BadRequestObjectResult>();
    (result.Result as BadRequestObjectResult).Value.Should().Be("User not found");
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