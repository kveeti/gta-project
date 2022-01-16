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
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Backend.Tests;

public class AuthControllerTests
{
  private readonly Mock<IGenericRepo<User>> _fakeRepo = new();
  private readonly IJwt _jwt = new Jwt();

  private readonly IOptions<Settings> _testSettings = Options.Create<Settings>(
    new Settings()
    {
      JWT_Secret = Guid.NewGuid().ToString(),
      JWT_Iss = "test",
      JWT_Aud = "test"
    });

  [Fact]
  public async Task Register_WithUniqueUserName_ReturnsCorrectToken()
  {
    var newUser = CreateFakeAuthUser();
    var dbUser = new User()
    {
      Id = Guid.NewGuid(),
      Username = newUser.Username,
      Password = newUser.Password,
      Role = "Standard"
    };

    _fakeRepo.Setup(repo => repo.Add(dbUser)).Verifiable();

    var controller = new AuthController(_fakeRepo.Object, _testSettings, _jwt);

    var result = await controller.Register(newUser);

    var token = (result.Result as OkObjectResult).Value as string;

    var decoded = _jwt.Decode(token);

    var roleClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.Role);
    var usernameClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.Name);
    var idClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier);

    roleClaim.Value.Should().Be("Standard");
    usernameClaim.Value.Should().Be(newUser.Username);

    var isValidGuid = Guid.TryParse(idClaim.Value, out _);
    isValidGuid.Should().BeTrue();
  }

  [Fact]
  public async Task Register_WithTakenUsername_ReturnsConflict()
  {
    var newUser = CreateFakeAuthUser();
    var existingUser = new User()
    {
      Id = Guid.NewGuid(),
      Username = newUser.Username,
      Password = newUser.Password,
      Role = "Standard"
    };

    _fakeRepo.Setup(repo => repo.GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var controller = new AuthController(_fakeRepo.Object, _testSettings, _jwt);

    var result = await controller.Register(newUser);

    result.Result.Should().BeOfType<ConflictObjectResult>();
    (result.Result as ConflictObjectResult).Value.Should().Be("username taken");
  }

  [Fact]
  public async Task Login_WithExistingUser_ReturnsCorrectToken()
  {
    var authUser = CreateFakeAuthUser();
    var existingUser = new User()
    {
      Id = Guid.NewGuid(),
      Username = authUser.Username,
      Password = Hashing.HashToString(authUser.Password),
      Role = "Standard"
    };

    _fakeRepo.Setup(repo => repo.GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var controller = new AuthController(_fakeRepo.Object, _testSettings, _jwt);

    var result = await controller.Login(authUser);

    var token = (result.Result as OkObjectResult).Value as string;

    var decoded = _jwt.Decode(token);

    var RoleClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.Role);
    var UsernameClaim = decoded.Claims.First((claim => claim.Type == ClaimTypes.Name));

    RoleClaim.Value.Should().Be("Standard");
    UsernameClaim.Value.Should().Be(authUser.Username);
  }

  [Fact]
  public async Task Login_WithNoExistingUser_ReturnsNotFound()
  {
    var authUser = CreateFakeAuthUser();

    _fakeRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    var controller = new AuthController(_fakeRepo.Object, _testSettings, _jwt);

    var result = await controller.Login(authUser);

    result.Result.Should().BeOfType<NotFoundObjectResult>();
    (result.Result as NotFoundObjectResult).Value.Should().Be("user not found");
  }

  [Fact]
  public async Task Login_WithWrongPassword_ReturnsUnauthorized()
  {
    var authUser = CreateFakeAuthUser();
    var existingUser = new User()
    {
      Id = Guid.NewGuid(),
      Username = authUser.Username,
      Password = Hashing.HashToString(Guid.NewGuid().ToString()),
      Role = "Standard"
    };

    _fakeRepo.Setup(repo => repo.GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var controller = new AuthController(_fakeRepo.Object, _testSettings, _jwt);

    var result = await controller.Login(authUser);

    result.Result.Should().BeOfType<UnauthorizedObjectResult>();
    (result.Result as UnauthorizedObjectResult).Value.Should().Be("incorrect password");
  }

  private static AuthUserDto CreateFakeAuthUser()
  {
    return new()
    {
      Username = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString()
    };
  }
}