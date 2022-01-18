using AutoMapper;
using Backend.Api.Helpers;
using Backend.Api.Repositories;
using Backend.Api.SearchDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("gta-api/search")]
public class SearchController : ControllerBase
{
  private readonly IJwt _jwt;
  private readonly IMapper _mapper;

  private readonly ICarRepo _carRepo;
  private readonly IGarageRepo _garageRepo;
  
  public SearchController(
    IJwt aJwt, 
    IMapper aMapper,
    ICarRepo aCarRepo,
    IGarageRepo aGarageRepo
    )
  {
    _jwt = aJwt;
    _mapper = aMapper;

    _carRepo = aCarRepo;
    _garageRepo = aGarageRepo;
  }

  [HttpGet]
  [Authorize]
  public async Task<ActionResult<SearchDto>> Search(string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

    var cars = await _carRepo
      .GetManyByFilter(car => car.OwnerId == userId);
      
    var garages =  await _garageRepo
      .GetManyByFilter(garage => garage.OwnerId == userId);
    
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