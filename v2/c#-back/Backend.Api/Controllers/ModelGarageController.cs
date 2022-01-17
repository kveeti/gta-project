using System.Security.Claims;
using Backend.Api.Attributes;
using Backend.Api.Helpers;
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

  public ModelGarageController(IGenericRepo<ModelGarage> aModelGarageRepo)
  {
    _db = aModelGarageRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<ModelGarage>>> GetAll([CanBeNull] string query)
  {
    var garages = await _db.GetAll();
    if (query == null) return Ok(garages);

    var results = Search.GetResults(garages, query);

    return Ok(results);
  }

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<ModelGarage>> GetById(Guid id)
  {
    var found = await _db.GetOneByFilter(garage => garage.Id == id);
    if (found == null) return NotFound();

    return Ok(found);
  }

  [HttpPost]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelGarage>> Add(ModelGarageDto aDto)
  {
    var existing = await _db.GetOneByFilter(garage => garage.Name == aDto.Name);
    if (existing != null) return Conflict(existing);

    ModelGarage newModelGarage = new()
    {
      Id = Guid.NewGuid(),
      Name = aDto.Name,
      Capacity = aDto.Capacity,
      Type = aDto.Type
    };

    _db.Add(newModelGarage);
    await _db.Save();

    return Ok(newModelGarage);
  }

  [HttpPatch("{id:Guid}")]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelGarage>> Update(Guid id, ModelGarageDto aDto)
  {
    var existing = await _db.GetOneByFilter(garage => garage.Id == id);
    if (existing == null) return NotFound();

    existing.Name = aDto.Name;
    existing.Capacity = aDto.Capacity;
    existing.Type = aDto.Type;

    await _db.Save();

    return Ok(existing);
  }
}