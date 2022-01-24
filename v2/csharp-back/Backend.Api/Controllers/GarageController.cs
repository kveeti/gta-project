using Backend.Api.Attributes;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/garages")]
public class GarageController : ControllerBase
{
  private readonly IGarageRepo _garageRepo;
  private readonly IGenericRepo<ModelGarage> _modelGarageRepo;

  public GarageController(
    IGarageRepo aGarageRepo,
    IGenericRepo<ModelGarage> aModelGarageRepo)
  {
    _garageRepo = aGarageRepo;
    _modelGarageRepo = aModelGarageRepo;
  }

  [HttpGet]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<IEnumerable<JoinedGarageDto>>> GetAll([CanBeNull] string query)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

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
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var garage = await _garageRepo
      .GetOneJoinedByFilter(garage => garage.Id == id
                                      &&
                                      garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");

    return Ok(garage);
  }

  [HttpPost]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<Garage>> Add(NewGarageDto dto)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

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

  [HttpPatch("{id:Guid}/desc")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<Garage>> Update(Guid id, UpdateGarageDto aDto)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var garage = await _garageRepo
      .GetOneByFilterTracking(garage => garage.Id == id
                                        &&
                                        garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");
    if (aDto.NewDesc == null) return BadRequest("newDesc not provided");

    garage.Desc = aDto.NewDesc;

    await _garageRepo.Save();

    return Ok(garage);
  }

  [HttpDelete("{id:Guid}")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<string>> Delete(Guid id)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

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