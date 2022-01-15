using System.Security.Claims;
using Backend.Api.Attributes;
using Backend.Api.ModelCarDtos;
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
  private readonly IGenericRepo<ModelCar> _db;

  public ModelCarController(IGenericRepo<ModelCar> aModelCarRepo)
  {
    _db = aModelCarRepo;
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

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<ModelCar>> GetOne(Guid id)
  {
    var found = await _db.GetOneByFilter(car => car.Id == id);
    if (found == null) return NotFound();

    return Ok(found);
  }

  [HttpPost]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelCar>> Add(ModelCarDto aDto)
  {
    var existing = await _db.GetOneByFilter(car => car.Name == aDto.Name);
    if (existing != null) return Conflict(existing);
    
    ModelCar newModelCar = new()
    {
      Id = Guid.NewGuid(),
      Name = aDto.Name,
      Manufacturer = aDto.Manufacturer,
      Class = aDto.Class
    };

    _db.Add(newModelCar);
    await _db.Save();

    return Ok(newModelCar);
  }

  [HttpPatch("{aId:Guid}")]
  [Authorization.CustomAuth(ClaimTypes.Role, "Admin")]
  public async Task<ActionResult<ModelCar>> Update(Guid aId, ModelCarDto aDto)
  {
    var existingModelCar = await _db.GetOneByFilter(car => car.Id == aId);
    if (existingModelCar == null) return NotFound();

    existingModelCar.Name = aDto.Name;
    existingModelCar.Manufacturer = aDto.Manufacturer;
    existingModelCar.Class = aDto.Class;
    
    await _db.Save();

    return Ok(existingModelCar);
  }
}