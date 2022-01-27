using Backend.Api.Attributes;
using Backend.Api.CarDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.MoveDtos;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/cars")]
public class CarController : ControllerBase
{
  private readonly ICarRepo _carRepo;
  private readonly IGarageRepo _garageRepo;
  private readonly IGenericRepo<ModelCar> _modelCarRepo;

  public CarController(
    ICarRepo aCarRepo,
    IGarageRepo aGarageRepo,
    IGenericRepo<ModelCar> aModelCarRepo
  )
  {
    _carRepo = aCarRepo;
    _garageRepo = aGarageRepo;
    _modelCarRepo = aModelCarRepo;
  }

  [HttpGet]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<IEnumerable<JoinedCarDto>>> GetAll([CanBeNull] string query)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var cars = await _carRepo
      .GetMatching(userId, query);

    if (query == null)
      return Ok(cars);

    var results = Search.GetResults(cars, query);

    return Ok(results.Take(5));
  }

  [HttpGet("{id:Guid}")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<JoinedCarDto>> GetOne(Guid id)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var car = await _carRepo
      .GetOneJoinedByFilter(car => car.Id == id
                                   &&
                                   car.OwnerId == userId);

    if (car == null) return NotFound("car was not found");

    return Ok(car);
  }

  [HttpPost]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<Car>> Add(NewCarDto aDto)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");
    if (HttpContext.Items["emailVerified"] as string == "False") return BadRequest("Email must be verified");

    var modelCar = await _modelCarRepo
      .GetOneByFilter(modelCar => modelCar.Id == aDto.ModelCarId);

    var garage = await _garageRepo
      .GetOneJoinedByFilter(garage => garage.Id == aDto.GarageId
                                      &&
                                      garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");
    if (modelCar == null) return NotFound("model car was not found");

    if (garage.Cars.Count() >= garage.Capacity) return BadRequest("garage is full");

    Car newCar = new()
    {
      Id = Guid.NewGuid(),
      OwnerId = userId,
      GarageId = garage.Id,
      ModelCarId = modelCar.Id
    };

    _carRepo.Add(newCar);
    await _carRepo.Save();

    return Ok(newCar);
  }

  [HttpPost("move")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<IEnumerable<ReturnCarDto>>> Move(MoveCarDto aDto)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");
    if (HttpContext.Items["emailVerified"] as string == "False") return BadRequest("Email must be verified");

    var newGarage = await _garageRepo
      .GetOneJoinedByFilter(garage => garage.Id == aDto.NewGarageId
                                      &&
                                      garage.OwnerId == userId);

    if (newGarage == null) return NotFound("garage was not found");

    var cars = await _carRepo
      .GetManyByFilterTracking(car => car.OwnerId == userId
                                      &&
                                      aDto.CarIds.Contains(car.Id));

    if (!cars.Any()) return NotFound("no cars were found");

    if ((newGarage.Capacity - newGarage.Cars.Count()) < cars.Count())
      return BadRequest("garage is full");

    foreach (var car in cars)
    {
      car.GarageId = newGarage.Id;
    }

    await _carRepo.Save();

    var movedCars = await _carRepo.GetManyJoinedByFilter(car => car.OwnerId == userId
                                                                &&
                                                                aDto.CarIds.Contains(car.Id));

    return Ok(movedCars);
  }

  [HttpDelete]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<string>> Delete(DeleteCarsDto aDto)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");
    if (HttpContext.Items["emailVerified"] as string == "False") return BadRequest("Email must be verified");

    var cars = await _carRepo
      .GetManyByFilterTracking(car => car.OwnerId == userId
                                      &&
                                      aDto.carIds.Contains(car.Id));

    if (!cars.Any()) return NotFound("no cars were found");

    foreach (var car in cars)
    {
      _carRepo.Delete(car);
    }

    await _carRepo.Save();

    return NoContent();
  }
}