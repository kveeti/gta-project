using Backend.Api.CarDtos;
using Backend.Api.GarageDtos;
using Backend.Api.Models;

namespace Backend.Api.Helpers;

public static class Search
{
  public static IEnumerable<JoinedCarDto> GetResults(IEnumerable<JoinedCarDto> aCars, string aQuery)
  {
    return Filter(aCars, aQuery)
      .OrderBy(c => c.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Manufacturer.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Garage.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(c => c.Garage.Desc.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }

  public static IEnumerable<JoinedGarageDto> GetResults(IEnumerable<JoinedGarageDto> aGarages, string aQuery)
  {
    return Filter(aGarages, aQuery)
      .OrderBy(g => g.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(g => g.Desc.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }

  public static IEnumerable<ModelGarage> GetResults(IEnumerable<ModelGarage> aGarages, string aQuery)
  {
    return Filter(aGarages, aQuery)
      .OrderBy(g => g.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }

  public static IEnumerable<ModelCar> GetResults(IEnumerable<ModelCar> aCars, string aQuery)
  {
    return Filter(aCars, aQuery)
      .OrderBy(car => car.Manufacturer.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0)
      .ThenBy(car => car.Name.IndexOf(aQuery, StringComparison.OrdinalIgnoreCase) != 0);
  }


  private static IEnumerable<JoinedCarDto> Filter(IEnumerable<JoinedCarDto> aCars, string aQuery)
  {
    return aCars.Where(c =>
      c.Name.Contains(aQuery) ||
      c.Manufacturer.Contains(aQuery) ||
      c.Garage.Name.Contains(aQuery) ||
      c.Garage.Desc.Contains(aQuery)
    ).ToList();
  }

  private static IEnumerable<JoinedGarageDto> Filter(IEnumerable<JoinedGarageDto> aGarages, string aQuery)
  {
    return aGarages.Where(g => g.Name.Contains(aQuery) || g.Desc.Contains(aQuery));
  }

  private static IEnumerable<ModelGarage> Filter(IEnumerable<ModelGarage> aModelGarages, string aQuery)
  {
    return aModelGarages.Where(garage => garage.Name.Contains(aQuery));
  }

  private static IEnumerable<ModelCar> Filter(IEnumerable<ModelCar> aCars, string aQuery)
  {
    return aCars.Where(car => car.Name.Contains(aQuery) || car.Manufacturer.Contains(aQuery));
  }
}