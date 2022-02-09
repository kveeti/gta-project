using Backend.Api.Attributes;
using Backend.Api.Dtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
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

    if (query != null)
      query = Sanitize.GetGoodQuery(query);
    
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

    var modelCars = await _modelCarRepo
      .GetManyByFilter(modelCar => aDto.ModelCarIds.Contains(modelCar.Id));

    var garage = await _garageRepo
      .GetOneJoinedByFilter(garage => garage.Id == aDto.GarageId
                                      &&
                                      garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");
    if (!modelCars.Any()) return NotFound("no model cars were found");

    var room = garage.Capacity - garage.Cars.Count();
    if (room <= 0 || modelCars.Count() > room) return BadRequest("Garage does not have enough room.");

    foreach (var modelCar in modelCars)
    {
      _carRepo.Add(new Car()
      {
        Id = Guid.NewGuid(),
        OwnerId = userId,
        GarageId = garage.Id,
        ModelCarId = modelCar.Id
      });
    }
    
    await _carRepo.Save();

    return NoContent();
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
      return BadRequest("Garage does not have enough room");

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