using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Api.Controllers;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests;

public class GarageControllerTests
{
  private readonly int _randomNum = new Random().Next(20);

  private readonly Mock<IJwt> _fakeJwt = new();
  private readonly Mock<ISimplify> _fakeSimplify = new();
  private readonly Mock<IGenericRepo<Car>> _fakeCarRepo = new();
  private readonly Mock<IGenericRepo<Garage>> _fakeGarageRepo = new();
  private readonly Mock<IGenericRepo<ModelGarage>> _fakeModelGarageRepo = new();

  [Fact]
  public async Task GetAll_WithNoQuery_ReturnsAllGarages()
  {
    IEnumerable<SimplifiedGarageDto> allGarages = new[]
    {
      CreateFakeSimplifiedGarage(),
      CreateFakeSimplifiedGarage(),
      CreateFakeSimplifiedGarage(),
      CreateFakeSimplifiedGarage(),
    };

    _fakeSimplify.Setup(simplify => simplify
        .GetSimplifiedGaragesForUser(It.IsAny<Guid>()))
      .ReturnsAsync(allGarages);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.GetAll(null);

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();

    (result.Result as OkObjectResult)
      .Value
      .Should()
      .BeEquivalentTo(allGarages);
  }

  [Fact]
  public async Task GetAll_WithQuery_ReturnsExpectedGaragesInCorrectOrder()
  {
    IEnumerable<SimplifiedGarageDto> allGarages = new[]
    {
      CreateFakeSimplifiedGarage("test-ok"),
      CreateFakeSimplifiedGarage("ok-test"),
      CreateFakeSimplifiedGarage("test-ok"),
      CreateFakeSimplifiedGarage("not-ok"),
    };

    var expectedGarages = new[]
    {
      allGarages.ElementAt(0),
      allGarages.ElementAt(2),
      allGarages.ElementAt(1)
    };

    _fakeSimplify.Setup(simplify => simplify
        .GetSimplifiedGaragesForUser(It.IsAny<Guid>()))
      .ReturnsAsync(allGarages);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.GetAll("test");

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();

    (result.Result as OkObjectResult)
      .Value
      .Should()
      .BeEquivalentTo(expectedGarages);
  }

  [Fact]
  public async Task GetOne_WithExistingGarage_ReturnsOkExistingGarage()
  {
    var dbReturns = CreateFakeGarage();
    var simplifiedExistingGarage = CreateFakeSimplifiedGarage();

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync(dbReturns);

    _fakeSimplify.Setup(simplify => simplify
        .GetOneSimplifiedGarage(It.IsAny<Garage>()))
      .ReturnsAsync(simplifiedExistingGarage);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.GetOne(simplifiedExistingGarage.Id);

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();

    (result.Result as OkObjectResult)
      .Value
      .Should()
      .BeEquivalentTo(simplifiedExistingGarage);
  }

  [Fact]
  public async Task GetOne_WithNoExistingGarage_ReturnsNotFound()
  {
    var simplifiedExistingGarage = CreateFakeSimplifiedGarage();

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync((Garage) null);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.GetOne(simplifiedExistingGarage.Id);

    result.Result
      .Should()
      .BeOfType<NotFoundObjectResult>();

    (result.Result as NotFoundObjectResult)
      .Value
      .Should()
      .Be("garage was not found");
  }

  [Fact]
  public async Task Add_WithNoExistingModelGarage_ReturnsModelGarageNotFound()
  {
    var newCarDto = new NewGarageDto()
    {
      ModelGarageId = Guid.NewGuid(),
      Desc = Guid.NewGuid().ToString()
    };

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync((Garage) null);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Add(newCarDto);

    result.Result
      .Should()
      .BeOfType<NotFoundObjectResult>();

    (result.Result as NotFoundObjectResult)
      .Value
      .Should()
      .Be("model garage does not exist");
  }

  [Fact]
  public async Task Add_WithExistingModelGarage_ReturnsCreatedGarage()
  {
    var userId = Guid.NewGuid();
    
    var existingModelGarage = new ModelGarage()
    {
      Id = Guid.NewGuid(),
      Name = Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      Type = Guid.NewGuid().ToString(),
    };

    var newGarageDto = new NewGarageDto()
    {
      ModelGarageId = existingModelGarage.Id,
      Desc = Guid.NewGuid().ToString()
    };

    var expectedCreatedGarage = new
    {
      Desc = newGarageDto.Desc,
      ModelGarageId = newGarageDto.ModelGarageId,
      OwnerId = userId
    };

    _fakeModelGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<ModelGarage, bool>>>()))
      .ReturnsAsync(existingModelGarage);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(userId);

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Add(newGarageDto);

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();

    (result.Result as OkObjectResult)
      .Value
      .Should()
      .BeEquivalentTo(expectedCreatedGarage)
      .And
      .BeOfType<Garage>();
  }

  [Fact]
  public async Task Add_WithAlreadyOwnedGarage_ReturnsBadRequestAlreadyOwned()
  {
    var existingModelGarage = new ModelGarage()
    {
      Id = Guid.NewGuid(),
      Name = Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      Type = Guid.NewGuid().ToString(),
    };

    var existingGarage = CreateFakeGarage();

    var newGarageDto = new NewGarageDto()
    {
      ModelGarageId = existingModelGarage.Id,
      Desc = Guid.NewGuid().ToString()
    };

    _fakeModelGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<ModelGarage, bool>>>()))
      .ReturnsAsync(existingModelGarage);

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync(existingGarage);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Add(newGarageDto);

    result.Result
      .Should()
      .BeOfType<BadRequestObjectResult>();

    (result.Result as BadRequestObjectResult)
      .Value
      .Should()
      .Be("garage already owned");
  }

  [Fact]
  public async Task Delete_WithNoExistingGarage_ReturnsGarageNotFound()
  {
    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync((Garage) null);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Delete(Guid.NewGuid());

    result.Result
      .Should()
      .BeOfType<NotFoundObjectResult>();

    (result.Result as NotFoundObjectResult)
      .Value
      .Should()
      .Be("garage was not found");
  }

  [Fact]
  public async Task Delete_WithExistingGarage_WithNoExistingCars_ReturnsNoContent()
  {
    var existingGarage = CreateFakeGarage();

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync(existingGarage);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Delete(Guid.NewGuid());

    result.Result
      .Should()
      .BeOfType<NoContentResult>();
  }

  [Fact]
  public async Task Delete_WithExistingGarage_WithExistingCars_CallsDeleteCorrectAmountOfTimes_ReturnsNoContent()
  {
    var existingGarage = CreateFakeGarage();
    var existingCars = Enumerable.Repeat(CreateFakeCar(), _randomNum);

    _fakeCarRepo.Setup(repo => repo
        .GetManyByFilter(It.IsAny<Expression<Func<Car, bool>>>()))
      .ReturnsAsync(existingCars);

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync(existingGarage);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Delete(Guid.NewGuid());
    
    _fakeCarRepo.Verify(repo => repo
        .Delete(It.IsAny<Car>()), 
      Times.Exactly(existingCars.Count()));

    result.Result
      .Should()
      .BeOfType<NoContentResult>();
  }

  // --- END OF TESTS ---

  private SimplifiedGarageDto CreateFakeSimplifiedGarage(string? queryableProps = null)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Name = queryableProps ?? Guid.NewGuid().ToString(),
      Desc = queryableProps ?? Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      Type = Guid.NewGuid().ToString()
    };
  }

  private Garage CreateFakeGarage()
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Desc = Guid.NewGuid().ToString(),
      OwnerId = Guid.NewGuid(),
      ModelGarageId = Guid.NewGuid()
    };
  }

  private Car CreateFakeCar()
  {
    return new()
    {
      Id = Guid.NewGuid(),
      GarageId = Guid.NewGuid(),
      ModelCarId = Guid.NewGuid(),
      OwnerId = Guid.NewGuid()
    };
  }
}