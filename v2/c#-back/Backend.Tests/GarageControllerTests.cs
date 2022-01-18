using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection.Metadata.Ecma335;
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

public class GarageControllerTests
{
  private readonly int _randomNum = new Random().Next(20);

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

  private readonly Mock<IJwt> _fakeJwt = new();
  private readonly Mock<IGarageRepo> _fakeGarageRepo = new();
  private readonly Mock<IGenericRepo<ModelGarage>> _fakeModelGarageRepo = new();

  [Fact]
  public async Task GetAll_WithQuery_ReturnsExpectedGaragesInCorrectOrder()
  {
    var userId = Guid.NewGuid();

    var garage = new Garage()
    {
      Id = Guid.NewGuid(),
      Desc = Guid.NewGuid().ToString(),
      ModelGarageId = Guid.NewGuid(),
      OwnerId = userId
    };
    
    IEnumerable<JoinedGarageDto> allGarages = new[]
    {
      CreateFakeJoinedGarage(garage,"test-ok"),
      CreateFakeJoinedGarage(garage,"ok-test"),
      CreateFakeJoinedGarage(garage,"test-ok"),
      CreateFakeJoinedGarage(garage,"not-ok"),
    };

    var expectedGarages = new[]
    {
      allGarages.ElementAt(0),
      allGarages.ElementAt(2),
      allGarages.ElementAt(1)
    };

    _fakeGarageRepo.Setup(repo => repo
        .GetManyByFilter(It.IsAny<Expression<Func<JoinedGarageDto, bool>>>()))
      .ReturnsAsync(allGarages);

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(userId);

    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new GarageController(
      _fakeJwt.Object,
      _mapper,
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
      .BeEquivalentTo(_mapper.Map<IEnumerable<ReturnGarageDto>>(expectedGarages));
  }
  

  // --- END OF TESTS ---

  private JoinedGarageDto CreateFakeJoinedGarage(string? queryableProps = null)
  {

    var joinedGarage = new JoinedGarageDto()
    {
      Id = Guid.NewGuid(),
      Name = queryableProps ?? Guid.NewGuid().ToString(),
      Desc = Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      OwnerId = Guid.NewGuid(),
      Type = Guid.NewGuid().ToString(),
    };

    IEnumerable<JoinedCarDto> cars = new[]
    {
      CreateFakeJoinedCar(joinedGarage, queryableProps),
      CreateFakeJoinedCar(joinedGarage, queryableProps),
      CreateFakeJoinedCar(joinedGarage, queryableProps),
    };

    return new()
    {
      Id = joinedGarage.Id,
      Name = queryableProps ?? joinedGarage.Name,
      Desc = joinedGarage.Desc,
      Capacity = joinedGarage.Capacity,
      OwnerId = joinedGarage.OwnerId,
      Type = joinedGarage.Type,
      Cars = cars
    };
  }

  private JoinedCarDto CreateFakeJoinedCar(JoinedGarageDto garage, string? queryableProps = null)
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
        Id = garage.Id,
        Name = queryableProps ?? garage.Name,
        Desc = queryableProps ?? garage.Desc,
        Capacity = garage.Capacity,
        Type = garage.Type
      }
    };
  }
}