using AutoMapper;
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
  private readonly IJwt _jwt;
  private readonly IMapper _mapper;

  private readonly ICarRepo _carRepo;
  private readonly IGarageRepo _garageRepo;
  private readonly IGenericRepo<ModelCar> _modelCarRepo;

  public CarController(
    IJwt aJwt,
    IMapper mapper,
    ICarRepo aCarRepo,
    IGarageRepo aGarageRepo,
    IGenericRepo<ModelCar> aModelCarRepo
  )
  {
    _jwt = aJwt;
    _mapper = mapper;

    _carRepo = aCarRepo;
    _garageRepo = aGarageRepo;
    _modelCarRepo = aModelCarRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<ReturnCarDto>>> GetAll([CanBeNull] string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var cars = await _carRepo
      .GetManyJoinedByFilter(car => car.OwnerId == userId);

    if (query == null)
      return Ok(_mapper.Map<IEnumerable<ReturnCarDto>>(cars));

    var results = Search.GetResults(cars, query);

    return Ok(_mapper.Map<IEnumerable<ReturnCarDto>>(results));
  }

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<ReturnCarDto>> GetOne(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var car = await _carRepo.GetOneJoinedByFilter(c => c.Id == id
                                                 &&
                                                 c.OwnerId == userId);

    if (car == null) return NotFound("car was not found");

    return Ok(_mapper.Map<ReturnCarDto>(car));
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<ReturnNotJoinedCarDto>> Add(NewCarDto aDto)
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

    return Ok(_mapper.Map<ReturnNotJoinedCarDto>(newCar));
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

    return NoContent();
  }

  [HttpDelete("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<string>> Delete(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var car = await _carRepo
      .GetOneJoinedByFilter(car => car.Id == id
                             &&
                             car.OwnerId == userId);

    if (car == null) return NotFound("car was not found");

    await _carRepo.Delete(car.Id);
    await _carRepo.Save();

    return NoContent();
  }
}