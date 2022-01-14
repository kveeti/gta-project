using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Api.Controllers;
using Backend.Api.ModelGarageDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests;

public class ModelGarageControllerTests
{
  private readonly Mock<IModelGarageRepo> _fakeRepo = new();
  private readonly int _randomNum = new Random().Next(20);

  [Fact]
  public async Task GetOne_WithExistingGarage_ReturnsOkExpectedGarage()
  {
    var expectedGarage = CreateFakeModelGarage();

    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
      .ReturnsAsync(expectedGarage);

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.GetById(Guid.NewGuid());

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(expectedGarage);
  }

  [Fact]
  public async Task GetOne_WithNoExistingGarage_ReturnsNotFound()
  {
    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
      .ReturnsAsync((ModelGarage) null);

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.GetById(Guid.NewGuid());

    result.Result.Should().BeOfType<NotFoundResult>();
  }

  [Fact]
  public async Task Add_WithNewModelGarage_ReturnsOkNewModelGarage()
  {
    ModelGarageDto newGarage = new()
    {
      Name = Guid.NewGuid().ToString(),
      Capacity = new Random().Next(20),
      Type = Guid.NewGuid().ToString()
    };

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.Add(newGarage);

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(newGarage);
  }

  [Fact]
  public async Task Add_WithConflictingName_ReturnsConflictExistingGarage()
  {
    ModelGarageDto newGarage = new()
    {
      Name = Guid.NewGuid().ToString(),
      Capacity = new Random().Next(20),
      Type = Guid.NewGuid().ToString()
    };
    var conflictingGarage = CreateFakeModelGarage();

    _fakeRepo.Setup(repo => repo.GetByName(It.IsAny<string>()))
      .ReturnsAsync(conflictingGarage);

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.Add(newGarage);

    result.Result.Should().BeOfType<ConflictObjectResult>();
    (result.Result as ConflictObjectResult).Value.Should().BeEquivalentTo(conflictingGarage);
  }

  [Fact]
  public async Task GetAll_WithNoQuery_ReturnsAllCars()
  {
    IEnumerable<ModelGarage> expectedGarages = new[]
    {
      CreateFakeModelGarage(),
      CreateFakeModelGarage(),
      CreateFakeModelGarage()
    };

    _fakeRepo.Setup(repo => repo.GetAll())
      .ReturnsAsync(expectedGarages);

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.GetAll(null);

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(expectedGarages);
  }

  [Fact]
  public async Task GetAll_WithQuery_ReturnsOnlyMatchingCars()
  {
    IEnumerable<ModelGarage> allGarages = new[]
    {
      CreateFakeModelGarage("test-ok", 20),
      CreateFakeModelGarage("test-ok", 20),
      CreateFakeModelGarage("not-ok", 20)
    };

    IEnumerable<ModelGarage> expectedCars = allGarages.Take(2);

    _fakeRepo.Setup(repo => repo.GetAll())
      .ReturnsAsync(allGarages);

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.GetAll("test");

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(expectedCars);
  }

  [Fact]
  public async Task Update_WithExistingCar_ReturnsUpdatedCar()
  {
    ModelGarage existingCar = CreateFakeModelGarage();
    ModelGarageDto dto = new()
    {
      Name = Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      Type = Guid.NewGuid().ToString()
    };
    ModelGarage updatedCar = new()
    {
      Id = existingCar.Id,
      Name = dto.Name,
      Capacity = dto.Capacity,
      Type = dto.Type
    };

    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
      .ReturnsAsync(existingCar);

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.Update(existingCar.Id, dto);

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(updatedCar);
  }

  [Fact]
  public async Task Update_WithNoExistingGarage_ReturnsNotFound()
  {
    ModelGarageDto dto = new()
    {
      Name = Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      Type = Guid.NewGuid().ToString()
    };

    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
      .ReturnsAsync((ModelGarage) null);

    var controller = new ModelGarageController(_fakeRepo.Object);

    var result = await controller.Update(Guid.NewGuid(), dto);

    result.Result.Should().BeOfType<NotFoundResult>();
  }

  private ModelGarage CreateFakeModelGarage()
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Name = Guid.NewGuid().ToString(),
      Capacity = _randomNum,
      Type = Guid.NewGuid().ToString()
    };
  }

  private ModelGarage CreateFakeModelGarage(string aProps, int aCapacity)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Name = aProps,
      Capacity = aCapacity,
      Type = aProps
    };
  }
}