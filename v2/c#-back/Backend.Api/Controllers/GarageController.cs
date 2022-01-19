using AutoMapper;
using Backend.Api.Attributes;
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
  private readonly IMapper _mapper;

  private readonly IGarageRepo _garageRepo;
  private readonly IGenericRepo<ModelGarage> _modelGarageRepo;

  public GarageController(
    IJwt aJwt,
    IMapper aMapper,
    IGarageRepo aGarageRepo,
    IGenericRepo<ModelGarage> aModelGarageRepo)
  {
    _jwt = aJwt;
    _mapper = aMapper;
    _garageRepo = aGarageRepo;
    _modelGarageRepo = aModelGarageRepo;
  }

  [HttpGet]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<IEnumerable<ReturnGarageDto>>> GetAll([CanBeNull] string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var garages = await _garageRepo
      .GetManyByFilter(garage => garage.OwnerId == userId);

    if (query == null)
      return Ok(_mapper.Map<IEnumerable<ReturnGarageDto>>(garages));

    var results = Search.GetResults(garages, query);

    return Ok(_mapper.Map<IEnumerable<ReturnGarageDto>>(results));
  }

  [HttpGet("{id:Guid}")]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<ReturnGarageDto>> GetOne(Guid id)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var garage = await _garageRepo
      .GetOneByFilter(garage => garage.Id == id
                                &&
                                garage.OwnerId == userId);

    if (garage == null) return NotFound("garage was not found");

    return Ok(_mapper.Map<ReturnGarageDto>(garage));
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

    return Ok(_mapper.Map<ReturnNotJoinedGarageDto>(newGarage));
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