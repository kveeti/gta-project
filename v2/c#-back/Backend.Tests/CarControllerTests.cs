using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Backend.Api.CarDtos;
using Backend.Api.Controllers;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests;

public class CarControllerTests
{
  private readonly Mock<IJwt> _fakeJwt = new();
  private readonly Mock<ISimplify> _fakeSimplify = new();

  private readonly Mock<IGenericRepo<Car>> _fakeCarRepo = new();
  private readonly Mock<IGenericRepo<Garage>> _fakeGarageRepo = new();
  private readonly Mock<IGenericRepo<ModelCar>> _fakeModelCarRepo = new();

  [Fact]
  public async Task GetAll_WithNoQuery_ReturnsAllCars()
  {
    IEnumerable<SimplifiedCarDto> allCars = new[]
    {
      CreateFakeSimplifiedCar(),
      CreateFakeSimplifiedCar(),
      CreateFakeSimplifiedCar(),
    };

    _fakeSimplify.Setup(simplify => simplify
        .GetSimplifiedCarsForUser(It.IsAny<Guid>()))
      .ReturnsAsync(allCars);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
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
      .BeEquivalentTo(allCars);
  }

  [Fact]
  public async Task GetAll_WithQuery_ReturnsExpectedCarsInCorrectOrder()
  {
    IEnumerable<SimplifiedCarDto> allCars = new[]
    {
      CreateFakeSimplifiedCar("test-ok"),
      CreateFakeSimplifiedCar("ok-test"),
      CreateFakeSimplifiedCar("test-ok"),
      CreateFakeSimplifiedCar("not-ok"),
    };

    var expectedCars = new[]
    {
      allCars.ElementAt(0),
      allCars.ElementAt(2),
      allCars.ElementAt(1)
    };

    _fakeSimplify.Setup(simplify => simplify
        .GetSimplifiedCarsForUser(It.IsAny<Guid>()))
      .ReturnsAsync(allCars);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
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
      .BeEquivalentTo(expectedCars);
  }

  [Fact]
  public async Task GetOne_WithExistingCar_ReturnsOkExistingCar()
  {
    var dbReturns = CreateFakeCar();
    var simplifiedExistingCar = CreateFakeSimplifiedCar(dbReturns);

    _fakeCarRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Car, bool>>>()))
      .ReturnsAsync(dbReturns);

    _fakeSimplify.Setup(simplify => simplify
        .GetOneSimplifiedCar(It.IsAny<Car>()))
      .ReturnsAsync(simplifiedExistingCar);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.GetOne(simplifiedExistingCar.Id);

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();

    (result.Result as OkObjectResult)
      .Value
      .Should()
      .BeEquivalentTo(simplifiedExistingCar);
  }

  [Fact]
  public async Task GetOne_WithNoExistingCar_ReturnsNotFound()
  {
    var simplifiedExistingCar = CreateFakeSimplifiedCar();

    _fakeCarRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Car, bool>>>()))
      .ReturnsAsync((Car) null);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.GetOne(simplifiedExistingCar.Id);

    result.Result
      .Should()
      .BeOfType<NotFoundObjectResult>();

    (result.Result as NotFoundObjectResult)
      .Value
      .Should()
      .Be("car was not found");
  }

  [Fact]
  public async Task Add_WithNoExistingGarage_ReturnsGarageNotFound()
  {
    var newCarDto = new NewCarDto()
    {
      ModelCarId = Guid.NewGuid(),
      GarageId = Guid.NewGuid()
    };

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync((Garage) null);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
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
      .Be("garage was not found");
  }

  [Fact]
  public async Task Add_WithNoExistingModelCar_ReturnsModelCarNotFound()
  {
    var newCarDto = new NewCarDto()
    {
      ModelCarId = Guid.NewGuid(),
      GarageId = Guid.NewGuid()
    };

    var existingGarage = new Garage()
    {
      Id = Guid.NewGuid(),
      Desc = Guid.NewGuid().ToString(),
      ModelGarageId = Guid.NewGuid(),
      OwnerId = Guid.NewGuid()
    };

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync(existingGarage);

    _fakeModelCarRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync((ModelCar) null);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
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
      .Be("model car was not found");
  }

  [Fact]
  public async Task Add_WithExistingDtoProps_ReturnsCreatedCar()
  {
    var userId = Guid.NewGuid();

    var existingModelCar = new ModelCar()
    {
      Id = Guid.NewGuid(),
      Name = Guid.NewGuid().ToString(),
      Class = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
    };

    var existingGarage = new Garage()
    {
      Id = Guid.NewGuid(),
      Desc = Guid.NewGuid().ToString(),
      ModelGarageId = Guid.NewGuid(),
      OwnerId = Guid.NewGuid()
    };

    var newCarDto = new NewCarDto()
    {
      ModelCarId = existingModelCar.Id,
      GarageId = existingGarage.Id
    };

    var expectedCreatedCar = new
    {
      ModelCarId = newCarDto.ModelCarId,
      GarageId = newCarDto.GarageId,
      OwnerId = userId
    };

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Garage, bool>>>()))
      .ReturnsAsync(existingGarage);

    _fakeModelCarRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync(existingModelCar);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(userId);

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
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
      .BeOfType<OkObjectResult>();

    (result.Result as OkObjectResult)
      .Value
      .Should()
      .BeEquivalentTo(expectedCreatedCar)
      .And
      .BeOfType<Car>();
  }

  [Fact]
  public async Task Delete_WithNoExistingCar_ReturnsCarNotFound()
  {
    _fakeCarRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Car, bool>>>()))
      .ReturnsAsync((Car) null);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Delete(Guid.NewGuid());

    result.Result.Should().BeOfType<NotFoundObjectResult>();
    (result.Result as NotFoundObjectResult)
      .Value
      .Should()
      .Be("car was not found");
  }

  [Fact]
  public async Task Delete_WithExistingCar_ReturnsNoContent()
  {
    var existingCar = CreateFakeCar();

    _fakeCarRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<Car, bool>>>()))
      .ReturnsAsync(existingCar);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _fakeSimplify.Object,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object,
      _fakeModelCarRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Delete(Guid.NewGuid());

    result.Result.Should().BeOfType<NoContentResult>();
  }


  // --- END OF TESTS ---

  private SimplifiedCarDto CreateFakeSimplifiedCar(string? queryableProps = null)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Class = Guid.NewGuid().ToString(),
      Manufacturer = queryableProps ?? Guid.NewGuid().ToString(),
      Name = queryableProps ?? Guid.NewGuid().ToString(),
      Garage = new()
      {
        Id = Guid.NewGuid(),
        Name = queryableProps ?? Guid.NewGuid().ToString(),
        Desc = queryableProps ?? Guid.NewGuid().ToString(),
        Capacity = new Random().Next(20),
        Type = Guid.NewGuid().ToString()
      }
    };
  }

  private SimplifiedCarDto CreateFakeSimplifiedCar(Car car)
  {
    return new()
    {
      Id = car.Id,
      Class = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      Garage = new()
      {
        Id = car.GarageId,
        Name = Guid.NewGuid().ToString(),
        Desc = Guid.NewGuid().ToString(),
        Capacity = new Random().Next(20),
        Type = Guid.NewGuid().ToString()
      }
    };
  }

  private Car CreateFakeCar()
  {
    return new Car()
    {
      Id = Guid.NewGuid(),
      GarageId = Guid.NewGuid(),
      ModelCarId = Guid.NewGuid(),
      OwnerId = Guid.NewGuid()
    };
  }
}