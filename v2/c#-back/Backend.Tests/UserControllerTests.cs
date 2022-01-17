using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Api.Controllers;
using Backend.Api.Dtos.UserDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests;

public class UserControllerTests
{
  private readonly Mock<IGenericRepo<User>> _fakeRepo = new();

  [Fact]
  public async Task GetOne_WithNoExistingUser_ReturnsNotFound()
  {
    _fakeRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    var controller = new UserController(_fakeRepo.Object);

    var result = await controller.GetOne(Guid.NewGuid());
    result.Result.Should().BeOfType<NotFoundResult>();
  }

  [Fact]
  public async Task GetOne_WithExistingUser_ReturnsExpectedUser()
  {
    var fakeUser = CreateFakeUser();
    var expectedReturnUser = FakeUserToDto(fakeUser);

    _fakeRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(fakeUser);

    var controller = new UserController(_fakeRepo.Object);

    var result = await controller.GetOne(Guid.NewGuid());

    var returnedUser = (result.Result as OkObjectResult).Value as ReturnUserDto;

    returnedUser.Should().BeEquivalentTo(expectedReturnUser);
  }

  [Fact]
  public async Task GetAll_ReturnsAllUsers()
  {
    var user1 = CreateFakeUser();
    var user2 = CreateFakeUser();
    var user3 = CreateFakeUser();

    IEnumerable<User> dbReturns = new[]
    {
      user1,
      user2,
      user3
    };

    IEnumerable<ReturnUserDto> expectedUsers = new[]
    {
      FakeUserToDto(user1),
      FakeUserToDto(user2),
      FakeUserToDto(user3),
    };

    _fakeRepo.Setup(repo => repo
        .GetAll())
      .ReturnsAsync(dbReturns);

    var controller = new UserController(_fakeRepo.Object);

    var result = await controller.GetAll();

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

    _fakeRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var controller = new UserController(_fakeRepo.Object);

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

    _fakeRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    var controller = new UserController(_fakeRepo.Object);

    var result = await controller.UpdateRole(Guid.NewGuid(), updateUserDto);

    result.Result.Should().BeOfType<NotFoundResult>();
  }

  [Fact]
  public async Task Delete_WithExistingUser_ReturnsNoContent()
  {
    var existingUser = CreateFakeUser();

    _fakeRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var controller = new UserController(_fakeRepo.Object);

    var result = await controller.Delete(Guid.NewGuid());

    result.Result.Should().BeOfType<NoContentResult>();
  }

  [Fact]
  public async Task Delete_WithNoExistingUser_ReturnsNotFound()
  {
    _fakeRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    var controller = new UserController(_fakeRepo.Object);

    var result = await controller.Delete(Guid.NewGuid());

    result.Result
      .Should()
      .BeOfType<NotFoundObjectResult>();
    
    (result.Result as NotFoundObjectResult)
      .Value
      .Should()
      .Be("user was not found");
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