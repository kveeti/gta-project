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
using Backend.Api.SearchDtos;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests;

public class SearchControllerTests
{
  private readonly Mock<IJwt> _fakeJwt = new();

  private readonly Mock<ICarRepo> _fakeCarRepo = new();
  private readonly Mock<IGarageRepo> _fakeGarageRepo = new();

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

  [Fact]
  public async Task Search_ReturnsExpectedCarsInCorrectOrder()
  {
    IEnumerable<JoinedCarDto> allCars = new[]
    {
      CreateFakeJoinedCar("test-ok"),
      CreateFakeJoinedCar("ok-test"),
      CreateFakeJoinedCar("test-ok"),
      CreateFakeJoinedCar("not-ok"),
      CreateFakeJoinedCar("not-ok")
    };

    IEnumerable<JoinedCarDto> expectedCars = new[]
    {
      allCars.ElementAt(0),
      allCars.ElementAt(2),
      allCars.ElementAt(1),
    };

    var garages = Array.Empty<JoinedGarageDto>();

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    _fakeCarRepo.Setup(simplify => simplify
      .GetManyJoinedByFilter(It.IsAny<Expression<Func<JoinedCarDto,bool>>>())
    ).ReturnsAsync(allCars);

    _fakeGarageRepo.Setup(simplify => simplify
        .GetManyJoinedByFilter(It.IsAny<Expression<Func<JoinedGarageDto,bool>>>()))
      .ReturnsAsync(garages);
    
    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new SearchController(
      _fakeJwt.Object,
      _mapper,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Search("test");

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();
    
    (((result.Result as OkObjectResult).Value) as SearchDto)
      .Cars
      .Should()
      .BeEquivalentTo(expectedCars);
  }
  
  [Fact]
  public async Task Search_ReturnsExpectedGaragesInCorrectOrder()
  {
    IEnumerable<JoinedGarageDto> allGarages = new[]
    {
      CreateFakeJoinedGarage("test-ok"),
      CreateFakeJoinedGarage("ok-test"),
      CreateFakeJoinedGarage("test-ok"),
      CreateFakeJoinedGarage("not-ok"),
      CreateFakeJoinedGarage("not-ok")
    };

    IEnumerable<JoinedGarageDto> expectedCars = new[]
    {
      allGarages.ElementAt(0),
      allGarages.ElementAt(2),
      allGarages.ElementAt(1),
    };

    var cars = Array.Empty<JoinedCarDto>();

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    _fakeCarRepo.Setup(simplify => simplify
      .GetManyJoinedByFilter(It.IsAny<Expression<Func<JoinedCarDto,bool>>>())
    ).ReturnsAsync(cars);

    _fakeGarageRepo.Setup(simplify => simplify
        .GetManyJoinedByFilter(It.IsAny<Expression<Func<JoinedGarageDto,bool>>>()))
      .ReturnsAsync(allGarages);
    
    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new SearchController(
      _fakeJwt.Object,
      _mapper,
      _fakeCarRepo.Object,
      _fakeGarageRepo.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Search("test");

    result.Result
      .Should()
      .BeOfType<OkObjectResult>();
    
    (((result.Result as OkObjectResult).Value) as SearchDto)
      .Garages
      .Should()
      .BeEquivalentTo(expectedCars);
  }


  // --- END OF TESTS ---

  private JoinedCarDto CreateFakeJoinedCar(string? queryableProps = null)
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

  private JoinedGarageDto CreateFakeJoinedGarage(string? queryableProps = null)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Name = queryableProps ?? Guid.NewGuid().ToString(),
      Desc = queryableProps ?? Guid.NewGuid().ToString(),
      Capacity = new Random().Next(20),
      Type = Guid.NewGuid().ToString()
    };
  }
}