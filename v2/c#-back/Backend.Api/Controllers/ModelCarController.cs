using System.Security.Claims;
using Backend.Api.Attributes;
using Backend.Api.Dtos.ModelCarDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;
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
  public ActionResult<IEnumerable<ModelCar>> GetAll()
  {
    return Ok(_db.GetAll());
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

    ModelCar updated = new()
    {
      Id = existingModelCar.Id,
      Name = dto.Name,
      Manufacturer = dto.Manufacturer,
      Class = dto.Class
    };

    await _db.Update();

    return Ok(updated);
  }
}