using Backend.Api.Helpers;
using Backend.Api.SearchDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/search")]
public class SearchController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly ISimplify _simplify;

  public SearchController(IJwt aJwt, ISimplify aSimplify)
  {
    _jwt = aJwt;
    _simplify = aSimplify;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<SearchDto>> Search(string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var cars = await _simplify.GetSimplifiedCarsForUser(userId);
    var garages = await _simplify.GetSimplifiedGaragesForUser(userId);

    var carsToReturn = Helpers.Search.GetResults(cars, query);
    var garagesToReturn = Helpers.Search.GetResults(garages, query);

    var toReturn = new SearchDto()
    {
      Cars = carsToReturn,
      Garages = garagesToReturn
    };

    return Ok(toReturn);
  }
}