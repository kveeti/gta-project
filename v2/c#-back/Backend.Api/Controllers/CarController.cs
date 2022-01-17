using Backend.Api.CarDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.MoveDtos;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/cars")]
public class CarController : ControllerBase
{
  private readonly ISimplify _simplify;
  private readonly IJwt _jwt;

  private readonly IGenericRepo<Car> _carRepo;
  private readonly IGenericRepo<Garage> _garageRepo;
  private readonly IGenericRepo<ModelCar> _modelCarRepo;

  public CarController(
    IJwt aJwt,
    ISimplify aSimplify,
    IGenericRepo<Car> aCarRepo,
    IGenericRepo<Garage> aGarageRepo,
    IGenericRepo<ModelCar> aModelCarRepo
  )
  {
    _jwt = aJwt;
    _simplify = aSimplify;

    _carRepo = aCarRepo;
    _garageRepo = aGarageRepo;
    _modelCarRepo = aModelCarRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<SimplifiedCarDto>>> GetAll([CanBeNull] string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var simplifiedCars = await _simplify.GetSimplifiedCarsForUser(userId);
    if (query == null) return Ok(simplifiedCars);

    var results = Search.GetResults(simplifiedCars, query);

    return Ok(results);
  }

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<SimplifiedCarDto>> GetOne(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var car = await _carRepo.GetOneByFilter(c => c.Id == id
                                                 &&
                                                 c.OwnerId == userId);

    if (car == null) return NotFound("car was not found");

    var simplifiedCar = await _simplify.GetOneSimplifiedCar(car);

    return Ok(simplifiedCar);
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Car>> Add(NewCarDto aDto)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var modelCar = await _modelCarRepo
      .GetOneByFilter(modelCar => modelCar.Id == aDto.ModelCarId);

    var garage = await _garageRepo
      .GetOneByFilter(garage => garage.Id == aDto.GarageId
                                &&
                                garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");
    if (modelCar == null) return NotFound("model car was not found");

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
  [Authorize]
  public async Task<ActionResult<string>> Move(MoveCarDto aDto)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var newGarage = await _garageRepo
      .GetOneByFilter(garage => garage.Id == aDto.NewGarageId
                                &&
                                garage.OwnerId == userId);

    if (newGarage == null) return NotFound("garage was not found");

    var cars = await _carRepo
      .GetManyByFilter(car => car.OwnerId == userId
                              &&
                              aDto.CarIds.Contains(car.Id));

    if (!cars.Any()) return NotFound("no cars were found");

    foreach (var car in cars)
    {
      car.GarageId = newGarage.Id;
    }

    await _carRepo.Save();

    return NoContent();
  }

  [HttpDelete("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<string>> Delete(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var car = await _carRepo
      .GetOneByFilter(car => car.Id == id
                             &&
                             car.OwnerId == userId);

    if (car == null) return NotFound("car was not found");

    _carRepo.Delete(car);
    await _carRepo.Save();

    return NoContent();
  }
}