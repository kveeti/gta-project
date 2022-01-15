using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Api;
using Backend.Api.Controllers;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Repositories;
using Backend.Api.Helpers;
using Backend.Api.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Backend.Tests;

public class AuthControllerTests
{
    private readonly Mock<IUserRepo> _fakeRepo = new();

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
            
        var controller = new AuthController(_fakeRepo.Object, _testSettings);

        var result = await controller.Register(newUser);

        var token = (result.Result as OkObjectResult).Value as string;

        var decoded = Jwt.Decode(token);

        var roleClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.Role);
        var usernameClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.Name);
        var idClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier);

        roleClaim.Value.Should().Be("Standard");
        usernameClaim.Value.Should().Be(newUser.Username);

        var isValidGuid = Guid.TryParse(idClaim.Value, out _);
        isValidGuid.Should().BeTrue();
    }
    
    [Fact]
    public async Task Register_WithTakenUsername_ReturnsBadRequest()
    {
        var newUser = CreateFakeAuthUser();
        var existingUser = new User()
        {
            Id = Guid.NewGuid(),
            Username = newUser.Username,
            Password = newUser.Password,
            Role = "Standard"
        };

        _fakeRepo.Setup(repo => repo.GetByUsername(It.IsAny<string>()))
            .Returns(existingUser);
        
        var controller = new AuthController(_fakeRepo.Object, _testSettings);

        var result = await controller.Register(newUser);

        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    [Fact]
    public void Login_WithExistingUser_ReturnsCorrectToken()
    {
        var authUser = CreateFakeAuthUser();
        var existingUser = new User()
        {
            Id = Guid.NewGuid(),
            Username = authUser.Username,
            Password = Hashing.HashToString(authUser.Password),
            Role = "Standard"
        };
        
        _fakeRepo.Setup(repo => repo.GetByUsername(It.IsAny<string>()))
            .Returns(existingUser);

        var controller = new AuthController(_fakeRepo.Object, _testSettings);

        var result = controller.Login(authUser);

        var token = (result.Result as OkObjectResult).Value as string;

        var decoded = Jwt.Decode(token);
        
        var RoleClaim = decoded.Claims.First(claim => claim.Type == ClaimTypes.Role);
        var UsernameClaim = decoded.Claims.First((claim => claim.Type == ClaimTypes.Name));

        RoleClaim.Value.Should().Be("Standard");
        UsernameClaim.Value.Should().Be(authUser.Username);
    }
    
    [Fact]
    public void Login_WithNoExistingUser_ReturnsNotFound()
    {
        var authUser = CreateFakeAuthUser();
        
        _fakeRepo.Setup(repo => repo.GetByUsername(It.IsAny<string>()))
            .Returns((User)null);

        var controller = new AuthController(_fakeRepo.Object, _testSettings);

        var result = controller.Login(authUser);

        result.Result.Should().BeOfType<NotFoundResult>();
    }
    
    [Fact]
    public void Login_WithWrongPassword_ReturnsUnauthorized()
    {
        var authUser = CreateFakeAuthUser();
        var existingUser = new User()
        {
            Id = Guid.NewGuid(),
            Username = authUser.Username,
            Password = Hashing.HashToString(Guid.NewGuid().ToString()),
            Role = "Standard"
        };
        
        _fakeRepo.Setup(repo => repo.GetByUsername(It.IsAny<string>()))
            .Returns(existingUser);

        var controller = new AuthController(_fakeRepo.Object, _testSettings);

        var result = controller.Login(authUser);

        result.Result.Should().BeOfType<UnauthorizedResult>();
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