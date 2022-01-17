using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Api.CarDtos;
using Backend.Api.Controllers;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
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
  private readonly Mock<ISimplify> _fakeSimplify = new();

  [Fact]
  public async Task Search_ReturnsExpectedCarsInCorrectOrder()
  {
    IEnumerable<SimplifiedCarDto> allCars = new[]
    {
      CreateFakeSimplifiedCar("test-ok"),
      CreateFakeSimplifiedCar("ok-test"),
      CreateFakeSimplifiedCar("test-ok"),
      CreateFakeSimplifiedCar("not-ok"),
      CreateFakeSimplifiedCar("not-ok")
    };

    IEnumerable<SimplifiedCarDto> expectedCars = new[]
    {
      allCars.ElementAt(0),
      allCars.ElementAt(2),
      allCars.ElementAt(1),
    };

    var garages = Array.Empty<SimplifiedGarageDto>();

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    _fakeSimplify.Setup(simplify => simplify
      .GetSimplifiedCarsForUser(It.IsAny<Guid>())
    ).ReturnsAsync(allCars);

    _fakeSimplify.Setup(simplify => simplify
        .GetSimplifiedGaragesForUser(It.IsAny<Guid>()))
      .ReturnsAsync(garages);
    
    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new SearchController(
      _fakeJwt.Object,
      _fakeSimplify.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Search("test");

    result.Result.Should().BeOfType<OkObjectResult>();
    (((result.Result as OkObjectResult).Value) as SearchDto)
      .Cars
      .Should()
      .BeEquivalentTo(expectedCars);
  }
  
  [Fact]
  public async Task Search_ReturnsExpectedGaragesInCorrectOrder()
  {
    IEnumerable<SimplifiedGarageDto> allGarages = new[]
    {
      CreateFakeSimplifiedGarage("test-ok"),
      CreateFakeSimplifiedGarage("ok-test"),
      CreateFakeSimplifiedGarage("test-ok"),
      CreateFakeSimplifiedGarage("not-ok"),
      CreateFakeSimplifiedGarage("not-ok")
    };

    IEnumerable<SimplifiedGarageDto> expectedCars = new[]
    {
      allGarages.ElementAt(0),
      allGarages.ElementAt(2),
      allGarages.ElementAt(1),
    };

    var cars = Array.Empty<SimplifiedCarDto>();

    _fakeJwt.Setup(jwt => jwt
        .GetUserId(It.IsAny<string>()))
      .Returns(Guid.NewGuid());

    _fakeSimplify.Setup(simplify => simplify
      .GetSimplifiedGaragesForUser(It.IsAny<Guid>())
    ).ReturnsAsync(allGarages);

    _fakeSimplify.Setup(simplify => simplify
        .GetSimplifiedCarsForUser(It.IsAny<Guid>()))
      .ReturnsAsync(cars);
    
    var httpContext = new DefaultHttpContext();
    httpContext.Request.Headers.Authorization = "testing testing";

    var controller = new SearchController(
      _fakeJwt.Object,
      _fakeSimplify.Object
    )
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = httpContext
      }
    };

    var result = await controller.Search("test");

    result.Result.Should().BeOfType<OkObjectResult>();
    (((result.Result as OkObjectResult).Value) as SearchDto)
      .Garages
      .Should()
      .BeEquivalentTo(expectedCars);
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

  private SimplifiedGarageDto CreateFakeSimplifiedGarage(string? queryableProps = null)
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