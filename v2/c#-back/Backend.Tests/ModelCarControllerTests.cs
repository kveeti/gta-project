using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Api.CarDtos;
using Backend.Api.Controllers;
using Backend.Api.GarageDtos;
using Backend.Api.ModelCarDtos;
using Backend.Api.ModelGarageDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests;

public class ModelCarControllerTests
{
  private readonly Mock<IGenericRepo<ModelCar>> _fakeRepo = new();
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
  public async Task GetOne_WithExistingCar_ReturnsOkExpectedCar()
  {
    var expectedCar = CreateFakeModelCar();

    _fakeRepo.Setup(repo => repo
        .GetOneNotJoinedByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync(expectedCar);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.GetOne(Guid.NewGuid());

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(expectedCar);
  }

  [Fact]
  public async Task GetOne_WithNoExistingCar_ReturnsNotFound()
  {
    _fakeRepo.Setup(repo => repo
        .GetOneNotJoinedByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync((ModelCar) null);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.GetOne(Guid.NewGuid());

    result.Result.Should().BeOfType<NotFoundResult>();
  }

  [Fact]
  public async Task Add_WithNewModelCar_ReturnsOkNewModelCar()
  {
    ModelCarDto newCar = new()
    {
      Name = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
      Class = Guid.NewGuid().ToString()
    };

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.Add(newCar);

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(newCar);
  }

  [Fact]
  public async Task Add_WithConflictingName_ReturnsConflictExistingCar()
  {
    ModelCarDto newCar = new()
    {
      Name = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
      Class = Guid.NewGuid().ToString()
    };
    var conflictingCar = CreateFakeModelCar();

    _fakeRepo.Setup(repo => repo
        .GetOneNotJoinedByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync(conflictingCar);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.Add(newCar);

    result.Result.Should().BeOfType<ConflictObjectResult>();
    (result.Result as ConflictObjectResult).Value.Should().BeEquivalentTo(conflictingCar);
  }

  [Fact]
  public async Task GetAll_WithNoQuery_ReturnsAllCars()
  {
    IEnumerable<ModelCar> expectedCars = new[]
    {
      CreateFakeModelCar(),
      CreateFakeModelCar(),
      CreateFakeModelCar()
    };

    _fakeRepo.Setup(repo => repo
        .GetAll())
      .ReturnsAsync(expectedCars);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.GetAll(null);

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(expectedCars);
  }

  [Fact]
  public async Task GetAll_WithQuery_ReturnsOnlyMatchingCars()
  {
    IEnumerable<ModelCar> allCars = new[]
    {
      CreateFakeModelCar("test-ok"),
      CreateFakeModelCar("test-ok"),
      CreateFakeModelCar("not-ok")
    };

    IEnumerable<ModelCar> expectedCars = allCars.Take(2);

    _fakeRepo.Setup(repo => repo
        .GetAll())
      .ReturnsAsync(allCars);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.GetAll("test");

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(expectedCars);
  }

  [Fact]
  public async Task Update_WithExistingCar_ReturnsUpdatedCar()
  {
    ModelCar existingCar = CreateFakeModelCar();
    ModelCarDto dto = new()
    {
      Name = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
      Class = Guid.NewGuid().ToString()
    };
    ModelCar updatedCar = new()
    {
      Id = existingCar.Id,
      Name = dto.Name,
      Manufacturer = dto.Manufacturer,
      Class = dto.Class
    };

    _fakeRepo.Setup(repo => repo
        .GetOneNotJoinedByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync(existingCar);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.Update(existingCar.Id, dto);

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(updatedCar);
  }

  [Fact]
  public async Task Update_WithNoExistingCar_ReturnsNotFound()
  {
    ModelCarDto dto = new()
    {
      Name = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
      Class = Guid.NewGuid().ToString()
    };

    _fakeRepo.Setup(repo => repo
        .GetOneNotJoinedByFilter(It.IsAny<Expression<Func<ModelCar, bool>>>()))
      .ReturnsAsync((ModelCar) null);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.Update(Guid.NewGuid(), dto);

    result.Result.Should().BeOfType<NotFoundResult>();
  }

  private ModelCar CreateFakeModelCar(string? aAllProps = null)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Name = aAllProps != null ? aAllProps : Guid.NewGuid().ToString(),
      Manufacturer = aAllProps != null ? aAllProps : Guid.NewGuid().ToString(),
      Class = aAllProps != null ? aAllProps : Guid.NewGuid().ToString()
    };
  }
}