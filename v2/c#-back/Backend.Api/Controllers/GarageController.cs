using Backend.Api.Attributes;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/garages")]
public class GarageController : ControllerBase
{
  private readonly IJwt _jwt;

  private readonly IGarageRepo _garageRepo;
  private readonly IGenericRepo<ModelGarage> _modelGarageRepo;

  public GarageController(
    IJwt aJwt,
    IGarageRepo aGarageRepo,
    IGenericRepo<ModelGarage> aModelGarageRepo)
  {
    _jwt = aJwt;
    _garageRepo = aGarageRepo;
    _modelGarageRepo = aModelGarageRepo;
  }

  [HttpGet]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<IEnumerable<JoinedGarageDto>>> GetAll([CanBeNull] string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var garages = await _garageRepo
      .GetMatching(userId, query);

    if (query == null)
      return Ok(garages);

    var results = Search.GetResults(garages, query);

    return Ok(results.Take(5));
  }

  [HttpGet("{id:Guid}")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<JoinedGarageDto>> GetOne(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var garage = await _garageRepo
      .GetOneJoinedByFilter(garage => garage.Id == id
                                &&
                                garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");

    return Ok(garage);
  }

  [HttpPost]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<ReturnNotJoinedGarageDto>> Add(NewGarageDto dto)
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
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<string>> Delete(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var garage = await _garageRepo
      .GetOneByFilterTracking(garage => garage.Id == id
                                        &&
                                        garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");

    _garageRepo.Delete(garage);
    await _garageRepo.Save();

    return NoContent();
  }
}