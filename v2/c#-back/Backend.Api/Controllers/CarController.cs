using Backend.Api.CarDtos;
using Backend.Api.Data;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.Models;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("cars")]
public class CarController : ControllerBase
{
  private readonly IUnitOfWork _uow;

  public CarController(IUnitOfWork aUow)
  {
    _uow = aUow;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<IEnumerable<SimplifiedCarDto>>> GetAll([CanBeNull] string query)
  {
    var userId = Jwt.GetUserId(HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1]);

    var cars = await _uow.CarRepo.GetManyByFilter(c => c.OwnerId == userId);
    var garages = await _uow.GarageRepo.GetManyByFilter(c => c.OwnerId == userId);
    var mGarages = await _uow.ModelGarageRepo.GetAll();
    var mCars = await _uow.ModelCarRepo.GetAll();

    var joined = cars.Join(garages,
      c => c.GarageId,
      g => g.Id,
      (car, garage) => new {Car = car, Garage = garage}
    ).Join(mGarages,
      comb => comb.Garage.ModelGarageId,
      mg => mg.Id,
      (comb, mGarage) => new
      {
        Id = comb.Car.Id,
        ModelCarId = comb.Car.ModelCarId,
        Garage = new SimplifiedGarageDto()
        {
          Id = mGarage.Id,
          Name = mGarage.Name,
          Desc = comb.Garage.Desc,
          Capacity = mGarage.Capacity,
          Type = mGarage.Type
        }
      }).Join(mCars,
      comb2 => comb2.ModelCarId,
      mCar => mCar.Id,
      (comb2, mCar) => new SimplifiedCarDto()
      {
        Id = comb2.Id,
        Name = mCar.Name,
        Manufacturer = mCar.Manufacturer,
        Class = mCar.Class,
        Garage = comb2.Garage
      }
    ).ToList();

    if (query == null) return Ok(joined);

    var filtered = joined;

    if (query.Length > 3)
    {
      filtered = joined
        .Where(c =>
          c.Name.Contains(query) ||
          c.Manufacturer.Contains(query) ||
          c.Garage.Name.Contains(query) ||
          c.Garage.Desc.Contains(query)
        ).ToList();
    }

    var toReturn = filtered
      .OrderBy(c => c.Name.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Manufacturer.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Garage.Name.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Garage.Desc.IndexOf(query, StringComparison.OrdinalIgnoreCase) != 0);

    return Ok(toReturn);
  }

  [HttpGet("{id:Guid}")]
  [Authorize]
  public async Task<ActionResult<Car>> GetOne(Guid id)
  {
    var userId = Jwt.GetUserId(HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1]);

    var found = await _uow.CarRepo.GetOneByFilter(c => c.Id == id && c.OwnerId == userId);
    if (found == null) return NotFound("Car was not found");

    return Ok(found);
  }

  [HttpPost]
  [Authorize]
  public async Task<ActionResult<Car>> Add(NewCarDto aDto)
  {
    var userId = Jwt.GetUserId(HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1]);

    var garage = await _uow.GarageRepo
      .GetOneByFilter(g => g.Id == aDto.GarageId && g.OwnerId == userId);
    var modelCar = await _uow.ModelCarRepo
      .GetOneByFilter(c => c.Id == aDto.ModelCarId);

    if (garage == null) return NotFound("Garage was not found");
    if (modelCar == null) return NotFound("Model car was not found");

    Car newCar = new()
    {
      Id = Guid.NewGuid(),
      OwnerId = userId,
      GarageId = garage.Id,
      ModelCarId = modelCar.Id
    };

    _uow.CarRepo.Add(newCar);
    await _uow.SaveChangesAsync();

    return Ok(newCar);
  }
}