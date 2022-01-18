using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Api.CarDtos;
using Backend.Api.Controllers;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.ModelCarDtos;
using Backend.Api.ModelGarageDtos;
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
  private readonly int _randomNum = new Random().Next(20);
  
  private readonly Mock<IJwt> _fakeJwt = new();
  
  private readonly IMapper _mapper = new Mapper(
    new MapperConfiguration(cfg =>
    {
      cfg.CreateMap<ModelGarage, ReturnModelGarageDto>();
      cfg.CreateMap<ModelCar, ReturnModelCarDto>();
      cfg.CreateMap<JoinedCarDto, ReturnCarDto>();
      cfg.CreateMap<JoinedGarageDto, ReturnGarageDto>();
      cfg.CreateMap<Car, ReturnNotJoinedCarDto>();
      cfg.CreateMap<Garage, ReturnNotJoinedGarageDto>();
    }));

  private readonly Mock<ICarRepo> _fakeCarRepo = new();
  private readonly Mock<IGarageRepo> _fakeGarageRepo = new();
  private readonly Mock<IGenericRepo<ModelCar>> _fakeModelCarRepo = new();

  [Fact]
  public async Task GetAll_WithNoQuery_ReturnsAllCars()
  {
    IEnumerable<JoinedCarDto> allCars = new[]
    {
      CreateFakeJoinedCar(),
      CreateFakeJoinedCar(),
      CreateFakeJoinedCar(),
    };

    _fakeCarRepo.Setup(repo => repo
        .GetManyJoinedByFilter(It.IsAny<Expression<Func<JoinedCarDto, bool>>>()))
      .ReturnsAsync(allCars);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _mapper,
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
      .BeEquivalentTo(_mapper.Map<IEnumerable<ReturnCarDto>>(allCars));
  }

  [Fact]
  public async Task GetAll_WithQuery_ReturnsExpectedCarsInCorrectOrder()
  {
    IEnumerable<JoinedCarDto> allCars = new[]
    {
      CreateFakeJoinedCar("test-ok"),
      CreateFakeJoinedCar("ok-test"),
      CreateFakeJoinedCar("test-ok"),
      CreateFakeJoinedCar("not-ok"),
    };

    var expectedCars = new[]
    {
      allCars.ElementAt(0),
      allCars.ElementAt(2),
      allCars.ElementAt(1)
    };

    _fakeCarRepo.Setup(repo => repo
        .GetManyJoinedByFilter(It.IsAny<Expression<Func<JoinedCarDto, bool>>>()))
      .ReturnsAsync(allCars);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _mapper,
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
      .BeEquivalentTo(_mapper.Map<IEnumerable<ReturnCarDto>>(expectedCars));
  }

  [Fact]
  public async Task GetOne_WithExistingCar_ReturnsOkExistingCar()
  {
    var dbReturns = CreateFakeJoinedCar();

    _fakeCarRepo.Setup(repo => repo
        .GetOneJoinedByFilter(It.IsAny<Expression<Func<JoinedCarDto, bool>>>()))
      .ReturnsAsync(dbReturns);
    
    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _mapper,
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

    var result = await controller.GetOne(dbReturns.Id);

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();

    (result.Result as OkObjectResult)
      .Value
      .Should()
      .BeEquivalentTo(_mapper.Map<ReturnCarDto>(dbReturns));
  }

  [Fact]
  public async Task GetOne_WithNoExistingCar_ReturnsNotFound()
  {
    var simplifiedExistingCar = CreateFakeJoinedCar();

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
      _mapper,
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
      _mapper,
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

    var existingGarage = CreateFakeJoinedGarage();

    _fakeModelCarRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync((ModelCar) null);
    
    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<JoinedGarageDto, bool>>>()))
      .ReturnsAsync(existingGarage);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _mapper,
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

    var existingGarage = CreateFakeJoinedGarage();

    var newCarDto = new NewCarDto()
    {
      ModelCarId = existingModelCar.Id,
      GarageId = existingGarage.Id
    };

    var expectedCreatedCar = new ReturnNotJoinedCarDto()
    {
      Id = It.IsAny<Guid>(),
      ModelCarId = newCarDto.ModelCarId,
      GarageId = newCarDto.GarageId,
      OwnerId = userId
    };

    _fakeGarageRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<JoinedGarageDto, bool>>>()))
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
      _mapper,
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
      .BeOfType<ReturnNotJoinedCarDto>();
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
      _mapper,
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
    var existingCar = CreateFakeJoinedCar();

    _fakeCarRepo.Setup(repo => repo
        .GetOneJoinedByFilter(It.IsAny<Expression<Func<JoinedCarDto, bool>>>()))
      .ReturnsAsync(existingCar);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new CarController(
      _fakeJwt.Object,
      _mapper,
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

  private JoinedGarageDto CreateFakeJoinedGarage(string? queryableProps = null)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Name = queryableProps ?? Guid.NewGuid().ToString(),
      Desc = queryableProps ?? Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      OwnerId = Guid.NewGuid(),
      Type = Guid.NewGuid().ToString()
    };
  }
  
  private JoinedCarDto CreateFakeJoinedCar(string? queryableProps = null)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Class = Guid.NewGuid().ToString(),
      Manufacturer = queryableProps ?? Guid.NewGuid().ToString(),
      Name = queryableProps ?? Guid.NewGuid().ToString(),
      OwnerId = Guid.NewGuid(),
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

  private JoinedCarDto CreateFakeJoinedCar(Car car)
  {
    return new()
    {
      Id = car.Id,
      Class = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      OwnerId = Guid.NewGuid(),
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