using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/garages")]
public class GarageController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly ISimplify _simplify;
  private readonly IGenericRepo<Car> _carRepo;
  private readonly IGenericRepo<Garage> _garageRepo;
  private readonly IGenericRepo<ModelGarage> _modelGarageRepo;

  public GarageController(
    IJwt aJwt,
    ISimplify aSimplify,
    IGenericRepo<Car> aCarRepo,
    IGenericRepo<Garage> aGarageRepo,
    IGenericRepo<ModelGarage> aModelGarageRepo)
  {
    _jwt = aJwt;
    _simplify = aSimplify;
    _carRepo = aCarRepo;
    _garageRepo = aGarageRepo;
    _modelGarageRepo = aModelGarageRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<SimplifiedGarageDto>>> GetAll([CanBeNull] string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var joined = await _simplify.GetSimplifiedGaragesForUser(userId);
    if (query == null) return Ok(joined);

    var results = Search.GetResults(joined, query);

    return Ok(results);
  }

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<Garage>> GetOne(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var garage = await _garageRepo
      .GetOneByFilter(garage => garage.Id == id
                                &&
                                garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");

    var simplifiedGarage = await _simplify.GetOneSimplifiedGarage(garage);
    return Ok(simplifiedGarage);
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Garage>> Add(NewGarageDto dto)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var modelGarage = await _modelGarageRepo
      .GetOneByFilter(modelGarage => modelGarage.Id == dto.ModelGarageId);

    if (modelGarage == null) return NotFound("model garage does not exist");

    var existingGarage = await _garageRepo
      .GetOneByFilter(garage => garage.ModelGarageId == dto.ModelGarageId
                                &&
                                garage.OwnerId == userId);

    if (existingGarage != null) return BadRequest("garage already owned");

    Garage newGarage = new()
    {
      Id = Guid.NewGuid(),
      Desc = dto.Desc,
      ModelGarageId = modelGarage.Id,
      OwnerId = userId
    };

    _garageRepo.Add(newGarage);
    await _garageRepo.Save();

    return Ok(newGarage);
  }

  [HttpDelete("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<string>> Delete(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var garage = await _garageRepo
      .GetOneByFilter(garage => garage.Id == id
                                &&
                                garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");

    var cars = await _carRepo
      .GetManyByFilter(car => car.GarageId == garage.Id
                              &&
                              car.OwnerId == userId
      );

    foreach (var car in cars)
    {
      _carRepo.Delete(car);
    }

    await _carRepo.Save();

    return NoContent();
  }
}