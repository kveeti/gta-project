using Backend.Api.Data;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("garages")]
public class GarageController : ControllerBase
{
  private readonly IUnitOfWork _uow;

  public GarageController(IUnitOfWork aUow)
  {
    _uow = aUow;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<SimplifiedGarageDto>>> GetAll([CanBeNull] string query)
  {
    var userId = Jwt.GetUserId(HttpContext);

    var garages = await _uow.GarageRepo.GetManyByFilter(g => g.OwnerId == userId);
    var modelGarages = await _uow.ModelGarageRepo.GetAll();

    var joined = garages.Join(modelGarages,
        garage => garage.ModelGarageId,
        modelGarage => modelGarage.Id,
        (garage, modelGarage) =>
          new {Garage = garage, ModelGarage = modelGarage})
      .ToList();

    var simplified = joined.Select(g => new SimplifiedGarageDto()
    {
      Id = g.Garage.Id,
      Name = g.ModelGarage.Name,
      Desc = g.Garage.Desc,
      Capacity = g.ModelGarage.Capacity,
      Type = g.ModelGarage.Type
    });

    if (query == null) return Ok(simplified);

    var filtered = simplified;

    if (query.Length > 3)
    {
      filtered = simplified
        .Where(g => g.Name.Contains(query) || g.Desc.Contains(query));
    }
    
    var toReturn = filtered
      .OrderBy(g => g.Name.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(g => g.Desc.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0);
    
    return Ok(toReturn);
  }

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<Garage>> GetOne(Guid id)
  {
    var userId = Jwt.GetUserId(HttpContext);

    var found = _uow.GarageRepo.GetOneByFilter(g => g.Id == id && g.OwnerId == userId);
    if (found == null) return NotFound("Garage was not found");

    return Ok(found);
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Garage>> Add(GarageDto dto)
  {
    var userId = Jwt.GetUserId(HttpContext);
    var modelGarage = await _uow.ModelGarageRepo.GetOneByFilter(m => m.Id == dto.ModelGarageId);

    if (modelGarage == null) return NotFound("Model garage does not exist");

    Garage newGarage = new()
    {
      Id = Guid.NewGuid(),
      Desc = dto.Desc,
      ModelGarageId = modelGarage.Id,
      OwnerId = userId
    };

    _uow.GarageRepo.Add(newGarage);
    await _uow.GarageRepo.Save();

    return Ok(newGarage);
  }
}