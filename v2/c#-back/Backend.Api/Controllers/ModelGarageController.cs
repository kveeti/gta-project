using System.Security.Claims;
using AutoMapper;
using Backend.Api.Attributes;
using Backend.Api.Helpers;
using Backend.Api.ModelCarDtos;
using Backend.Api.ModelGarageDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/modelgarages")]
public class ModelGarageController : ControllerBase
{
  private readonly IGenericRepo<ModelGarage> _db;
  private readonly IMapper _mapper;

  public ModelGarageController(
    IGenericRepo<ModelGarage> aModelGarageRepo,
    IMapper mapper
  )
  {
    _db = aModelGarageRepo;
    _mapper = mapper;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<ReturnModelGarageDto>>> GetAll([CanBeNull] string query)
  {
    var garages = await _db.GetAll();
    
    if (query == null) return Ok(_mapper.Map<IEnumerable<ReturnModelGarageDto>>(garages));

    var results = Search.GetResults(garages, query);

    return Ok(_mapper.Map<IEnumerable<ReturnModelGarageDto>>(results));
  }

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<ReturnModelGarageDto>> GetById(Guid id)
  {
    var found = await _db.GetOneNotJoinedByFilter(garage => garage.Id == id);
    if (found == null) return NotFound("model garage was not found");

    return Ok(_mapper.Map<ReturnModelGarageDto>(found));
  }

  [HttpPost]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ReturnModelGarageDto>> Add(ModelGarageDto aDto)
  {
    var existing = await _db.GetOneNotJoinedByFilter(garage => garage.Name == aDto.Name);
    if (existing != null) 
      return Conflict(_mapper.Map<ReturnModelGarageDto>(existing));

    ModelGarage newModelGarage = new()
    {
      Id = Guid.NewGuid(),
      Name = aDto.Name,
      Capacity = aDto.Capacity,
      Type = aDto.Type
    };

    _db.Add(newModelGarage);
    await _db.Save();

    return Ok(_mapper.Map<ReturnModelGarageDto>(newModelGarage));
  }

  [HttpPatch("{id:Guid}")]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ReturnModelGarageDto>> Update(Guid id, ModelGarageDto aDto)
  {
    var existing = await _db.GetOneNotJoinedByFilter(garage => garage.Id == id);
    if (existing == null) return NotFound();

    existing.Name = aDto.Name;
    existing.Capacity = aDto.Capacity;
    existing.Type = aDto.Type;

    await _db.Save();

    return Ok(_mapper.Map<ReturnModelGarageDto>(existing));
  }
}