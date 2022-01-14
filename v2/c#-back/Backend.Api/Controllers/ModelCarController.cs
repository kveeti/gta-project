using System.Security.Claims;
using Backend.Api.Attributes;
using Backend.Api.Dtos.ModelCarDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("modelcars")]
public class ModelCarController : ControllerBase
{
  private readonly IModelCarRepo _db;

  public ModelCarController(IModelCarRepo aModelCarRepo)
  {
    _db = aModelCarRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<ModelCar>>> GetAll([CanBeNull] string aQuery)
  {
    var cars = await _db.GetAll();
    if (aQuery == null) return Ok(cars);

    var filtered = cars.Where(car => car.Name.Contains(aQuery) || car.Manufacturer.Contains(aQuery));

    var toReturn = filtered
      .OrderBy(car => car.Manufacturer.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(car => car.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
    
    return Ok(toReturn);
  }

  [HttpGet("{aId:Guid}")]
  [Authorize]
  public async Task<ActionResult<ModelCar>> GetOne(Guid aId)
  {
    var found = await _db.GetById(aId);
    if (found == null) return NotFound();

    return Ok(found);
  }

  [HttpPost]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelCar>> Add(ModelCarDto aDto)
  {
    var existing = await _db.GetByName(aDto.Name);
    if (existing != null) return Conflict(existing);
    
    ModelCar newModelCar = new()
    {
      Id = Guid.NewGuid(),
      Name = aDto.Name,
      Manufacturer = aDto.Manufacturer,
      Class = aDto.Class
    };

    await _db.Add(newModelCar);

    return Ok(newModelCar);
  }

  [HttpPatch("{aId:Guid}")]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelCar>> Update(Guid aId, ModelCarDto aDto)
  {
    var existingModelCar = await _db.GetById(aId);
    if (existingModelCar == null) return NotFound();

    existingModelCar.Name = aDto.Name;
    existingModelCar.Manufacturer = aDto.Manufacturer;
    existingModelCar.Class = aDto.Class;
    
    await _db.Update();

    return Ok(existingModelCar);
  }
}