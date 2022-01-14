using System;
using System.Threading.Tasks;
using Backend.Api.Controllers;
using Backend.Api.Dtos.ModelCarDtos;
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
      .ReturnsAsync((ModelCar)null);

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
  
  private ModelCar CreateFakeModelCar()
  {
    return new()
    {
      Id = Guid.NewGuid(),
      Name = Guid.NewGuid().ToString(),
      Manufacturer = Guid.NewGuid().ToString(),
      Class = Guid.NewGuid().ToString()
    };
  }
}