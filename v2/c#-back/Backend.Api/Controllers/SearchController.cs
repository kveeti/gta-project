using Backend.Api.Attributes;
using Backend.Api.CarDtos;
using Backend.Api.GarageDtos;
using Backend.Api.Helpers;
using Backend.Api.Repositories;
using Backend.Api.SearchDtos;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/search")]
public class SearchController : ControllerBase
{
  private readonly IJwt _jwt;

  private readonly ICarRepo _carRepo;
  private readonly IGarageRepo _garageRepo;

  public SearchController(
    IJwt aJwt,
    ICarRepo aCarRepo,
    IGarageRepo aGarageRepo
  )
  {
    _jwt = aJwt;

    _carRepo = aCarRepo;
    _garageRepo = aGarageRepo;
  }

  [HttpGet]
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<SearchDto>> Search(string query)
  {
    var goodUserId = Guid.TryParse(HttpContext.Items["userId"].ToString(),
      out var userId);
    if (!goodUserId) return Unauthorized("bad userId");

    var cars = await _carRepo
      .GetManyJoinedByFilter(car => car.OwnerId == userId);

    var garages = await _garageRepo
      .GetManyJoinedByFilter(garage => garage.OwnerId == userId);

    IEnumerable<JoinedCarDto> carsToReturn = Array.Empty<JoinedCarDto>();
    IEnumerable<JoinedGarageDto> garagesToReturn = Array.Empty<JoinedGarageDto>();
    
    if (cars.Any())
      carsToReturn = Helpers.Search.GetResults(cars, query);
    
    if (garages.Any())
      garagesToReturn = Helpers.Search.GetResults(garages, query);

    var toReturn = new SearchDto()
    {
      Cars = carsToReturn,
      Garages = garagesToReturn
    };

    return Ok(toReturn);
  }
}