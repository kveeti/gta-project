using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Api.Controllers;
using Backend.Api.ModelCarDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace Backend.Tests;

public class ModelCarControllerTests
{
  private readonly Mock<IModelCarRepo> _fakeRepo = new();

  [Fact]
  public async Task GetOne_WithExistingCar_ReturnsOkExpectedCar()
  {
    var expectedCar = CreateFakeModelCar();

    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
      .ReturnsAsync(expectedCar);

    var controller = new ModelCarController(_fakeRepo.Object);

    var result = await controller.GetOne(Guid.NewGuid());

    result.Result.Should().BeOfType<OkObjectResult>();
    (result.Result as OkObjectResult).Value.Should().BeEquivalentTo(expectedCar);
  }

  [Fact]
  public async Task GetOne_WithNoExistingCar_ReturnsNotFound()
  {
    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
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

    _fakeRepo.Setup(repo => repo.GetByName(It.IsAny<string>()))
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

    _fakeRepo.Setup(repo => repo.GetAll())
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

    _fakeRepo.Setup(repo => repo.GetAll())
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

    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
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

    _fakeRepo.Setup(repo => repo.GetById(It.IsAny<Guid>()))
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