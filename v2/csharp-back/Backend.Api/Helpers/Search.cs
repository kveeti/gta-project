using Backend.Api.Dtos;
using Backend.Api.Models;

namespace Backend.Api.Helpers;

public static class Search
{
  public static IEnumerable<JoinedCarDto> GetResults(IEnumerable<JoinedCarDto> aCars, string aQuery)
  {
    return aCars
      .OrderBy(c => c.Garage.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Garage.Desc.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Manufacturer.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }

  public static IEnumerable<JoinedGarageDto> GetResults(IEnumerable<JoinedGarageDto> aGarages, string aQuery)
  {
    return aGarages
      .OrderBy(g => g.Desc.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(g => g.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }

  public static IEnumerable<ReturnModelGarageDto> GetResults(IEnumerable<ReturnModelGarageDto> aGarages, string aQuery)
  {
    return aGarages
      .OrderBy(g => g.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }

  public static IEnumerable<ModelCar> GetResults(IEnumerable<ModelCar> aCars, string aQuery)
  {
    return aCars
      .OrderBy(car => car.Manufacturer.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(car => car.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }
}