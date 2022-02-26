using System;
using System.Linq.Expressions;
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

public class RegisterTests
{
  private readonly IJwt _jwt;
  private readonly IMisc _fakeMisc;
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
    }
  );

  public RegisterTests()
  {
    _jwt = new Jwt(_jwtConfig);
    _fakeMisc = new Misc(_jwtConfig);
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
    var controller = new AuthController(_jwt, _fakeMisc, _fakeMailing.Object, _fakeUserRepo.Object)
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
    var controller = new AuthController(_jwt, _fakeMisc, _fakeMailing.Object, _fakeUserRepo.Object)
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