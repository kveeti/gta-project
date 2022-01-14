using System.Security.Claims;
using Backend.Api.Attributes;
using Backend.Api.ModelGarageDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("modelgarages")]
public class ModelGarageController : ControllerBase
{
  private readonly IModelGarageRepo _db;

  public ModelGarageController(IModelGarageRepo aModelGarageRepo)
  {
    _db = aModelGarageRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<ModelGarage>>> GetAll([CanBeNull] string aQuery)
  {
    var garages = await _db.GetAll();
    if (aQuery == null) return Ok(garages);

    var filtered = garages
      .Where(garage => garage.Name.Contains(aQuery));

    var sorted = filtered
      .OrderBy(garage => garage.Name
        .IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);

    return Ok(sorted);
  }

  [HttpGet("{aId:Guid}")]
  [Authorize]
  public async Task<ActionResult<ModelGarage>> GetById(Guid aId)
  {
    var found = await _db.GetById(aId);
    if (found == null) return NotFound();

    return Ok(found);
  }

  [HttpPost]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelGarage>> Add(ModelGarageDto aDto)
  {
    var existing = await _db.GetByName(aDto.Name);
    if (existing != null) return Conflict(existing);

    ModelGarage newModelGarage = new()
    {
      Id = Guid.NewGuid(),
      Name = aDto.Name,
      Capacity = aDto.Capacity,
      Type = aDto.Type
    };

    await _db.Add(newModelGarage);

    return Ok(newModelGarage);
  }

  [HttpPatch("{aId:Guid}")]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelGarage>> Update(Guid aId, ModelGarageDto aDto)
  {
    var existing = await _db.GetById(aId);
    if (existing == null) return NotFound();

    existing.Name = aDto.Name;
    existing.Capacity = aDto.Capacity;
    existing.Type = aDto.Type;

    await _db.Update();

    return Ok(existing);
  }
}