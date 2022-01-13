using System;
using System.Collections.Generic;
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
        var fakeUser = CreateFakeUser();
        var expectedReturnUser = FakeUserToDto(fakeUser);
        
        _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
            .ReturnsAsync(fakeUser);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = await controller.GetOne(Guid.NewGuid());

        var returnedUser = (result.Result as OkObjectResult).Value as ReturnUserDto;
        
        returnedUser.Should().BeEquivalentTo(expectedReturnUser);
    }

    [Fact]
    public void GetAll_ReturnsAllUsers()
    {
        IEnumerable<ReturnUserDto> expectedUsers = new[]
        {
            FakeUserToDto(CreateFakeUser()),
            FakeUserToDto(CreateFakeUser()),
            FakeUserToDto(CreateFakeUser()),
        };
        
        _fakeRepo.Setup(repo => repo.GetAll())
            .Returns(expectedUsers);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = controller.GetAll();

        var returnedUsers = (result.Result as OkObjectResult).Value as IEnumerable<ReturnUserDto>;

        returnedUsers.Should().BeEquivalentTo(expectedUsers);
    }

    [Fact]
    public async Task UpdateRole_WithExistingUser_ReturnsUpdatedUser()
    {
        UpdateUserDto updateUserDto = new()
        {
            NewRole = "Admin"
        };
        var existingUser = CreateFakeUser();
        var expectedUser = new ReturnUserDto()
        {
            Id = existingUser.Id,
            Username = existingUser.Username,
            Role = updateUserDto.NewRole
        };
        
        _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
            .ReturnsAsync(existingUser);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = await controller.UpdateRole(Guid.NewGuid(), updateUserDto);

        var returnedUser = (result.Result as OkObjectResult).Value as ReturnUserDto;

        returnedUser.Should().BeEquivalentTo(expectedUser);
    }
    
    [Fact]
    public async Task UpdateRole_WithNoExistingUser_ReturnsNotFound()
    {
        UpdateUserDto updateUserDto = new()
        {
            NewRole = "Admin"
        };
        
        _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
            .ReturnsAsync((User)null);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = await controller.UpdateRole(Guid.NewGuid(), updateUserDto);

        result.Result.Should().BeOfType<NotFoundResult>();
    }
    
    [Fact]
    public async Task Delete_WithExistingUser_ReturnsNoContent()
    {
        var existingUser = CreateFakeUser();
        
        _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
            .ReturnsAsync(existingUser);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = await controller.Delete(Guid.NewGuid());

        result.Result.Should().BeOfType<NoContentResult>();
    }
    
    [Fact]
    public async Task Delete_WithNoExistingUser_ReturnsNotFound()
    {
        _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
            .ReturnsAsync((User)null);

        var controller = new UserController(_fakeRepo.Object, _fakeSettings);

        var result = await controller.Delete(Guid.NewGuid());

        result.Result.Should().BeOfType<NotFoundResult>();
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