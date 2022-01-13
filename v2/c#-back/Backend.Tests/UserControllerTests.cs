using System;
using System.Threading.Tasks;
using Backend.Api;
using Backend.Api.Controllers;
using Backend.Api.Dtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace Backend.Tests;

public class UserControllerTests
{
    private readonly Mock<IUserRepo> _fakeRepo = new();
    private readonly IOptions<Settings>? _fakeSettings;

    [Fact]
    public async Task GetOne_WithNoExistingUser_ReturnsNotFound()
    {
        _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
            .ReturnsAsync((User)null);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = await controller.GetOne(Guid.NewGuid());
        result.Result.Should().BeOfType<NotFoundResult>();
    }
    
    [Fact]
    public async Task GetOne_WithExistingUser_ReturnsExpectedUser()
    {
        var expectedUser = CreateFakeUser();
        var expectedReturnUser = FakeUserToDto(expectedUser);
        
        _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
            .ReturnsAsync(expectedUser);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = await controller.GetOne(Guid.NewGuid());

        var returnedUser = (result.Result as OkObjectResult).Value as ReturnUserDto;
        
        returnedUser.Should().BeEquivalentTo(expectedReturnUser);
    }

    private static User CreateFakeUser()
    {
        return new()
        {
            Id = Guid.NewGuid(),
            Username = Guid.NewGuid().ToString(),
            Password = Guid.NewGuid().ToString(),
            Role = "Standard"
        };
    }

    private static ReturnUserDto FakeUserToDto(User fakeUser)
    {
        return new()
        {
            Id = fakeUser.Id,
            Username = fakeUser.Username,
            Role = fakeUser.Role
        };
    }
}