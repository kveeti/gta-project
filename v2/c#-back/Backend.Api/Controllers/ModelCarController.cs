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

  public ModelCarController(IModelCarRepo userRepo)
  {
    _db = userRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<ModelCar>>> GetAll([CanBeNull] string query)
  {
    var cars = await _db.GetAll();
    if (query == null) return Ok(cars);

    var filtered = cars.Where(car => car.Name.Contains(query) || car.Manufacturer.Contains(query));

    var toReturn = filtered
      .OrderBy(car => car.Manufacturer.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(car => car.Name.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0);
    
    return Ok(toReturn);
  }

  [HttpGet("{id}")]
  [Authorize]
  public async Task<ActionResult<ModelCar>> GetOne(Guid id)
  {
    var found = await _db.GetById(id);
    if (found == null) return NotFound();

    return Ok(found);
  }

  [HttpPost]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelCar>> Add(ModelCarDto dto)
  {
    var existing = await _db.GetByName(dto.Name);
    if (existing != null) return Conflict(existing);
    
    ModelCar newModelCar = new()
    {
      Id = Guid.NewGuid(),
      Name = dto.Name,
      Manufacturer = dto.Manufacturer,
      Class = dto.Class
    };

    await _db.Add(newModelCar);

    return Ok(newModelCar);
  }

  [HttpPatch("{id}")]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelCar>> Update(Guid id, ModelCarDto dto)
  {
    var existingModelCar = await _db.GetById(id);
    if (existingModelCar == null) return NotFound();

    existingModelCar.Name = dto.Name;
    existingModelCar.Manufacturer = dto.Manufacturer;
    existingModelCar.Class = dto.Class;
    
    await _db.Update();

    return Ok(existingModelCar);
  }
}