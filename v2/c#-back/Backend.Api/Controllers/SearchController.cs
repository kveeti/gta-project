using AutoMapper;
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
  [Authorization.CustomAuth("Standard, Admin")]
  public async Task<ActionResult<SearchDto>> Search(string query)
  {
    var token = HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
    var userId = _jwt.GetUserId(token);

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