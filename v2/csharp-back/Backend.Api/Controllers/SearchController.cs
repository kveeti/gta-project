using Backend.Api.Attributes;
using Backend.Api.Dtos;
using Backend.Api.Helpers;
using Backend.Api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
  private readonly ICarRepo _carRepo;
  private readonly IGarageRepo _garageRepo;

  public SearchController(
    ICarRepo aCarRepo,
    IGarageRepo aGarageRepo
  )
  {
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
    
    if (query != null)
          query = Sanitize.GetGoodQuery(query);

    var cars = await _carRepo
      .GetMatching(userId, query);

    var garages = await _garageRepo
      .GetMatching(userId, query);

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