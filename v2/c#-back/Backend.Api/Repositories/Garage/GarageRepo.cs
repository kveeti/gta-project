using System.Linq.Expressions;
using Backend.Api.CarDtos;
using Backend.Api.Data;
using Backend.Api.GarageDtos;
using Backend.Api.Models;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class GarageRepo : GenericRepo<Garage>, IGarageRepo
{
  private readonly DataContext _context;

  public GarageRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<IEnumerable<JoinedGarageDto>> GetMatching(Guid userId, [CanBeNull] string aQuery = null)
  {
    var dbQuery = _context.Garages
      .Include(garage => garage.ModelGarage)
      .Include(garage => garage.Cars)
      .ThenInclude(car => car.ModelCar)
      .Select(garage => new JoinedGarageDto()
      {
        Id = garage.Id,
        Desc = garage.Desc,
        Name = garage.ModelGarage.Name,
        Type = garage.ModelGarage.Type,
        Capacity = garage.ModelGarage.Capacity,
        Full = garage.Cars.Count >= garage.ModelGarage.Capacity,
        Room = garage.ModelGarage.Capacity - garage.Cars.Count,
        OwnerId = garage.OwnerId,
        Cars = garage.Cars.Select(car => new JoinedCarDto()
        {
          Id = car.Id,
          Name = car.ModelCar.Name,
          Manufacturer = car.ModelCar.Manufacturer,
          Class = car.ModelCar.Class,
          OwnerId = car.OwnerId,
          Garage = new PartialGarageDto()
          {
            Id = garage.Id,
            Desc = garage.Desc,
            Name = garage.ModelGarage.Name,
            Type = garage.ModelGarage.Type,
            Capacity = garage.ModelGarage.Capacity,
            Full = garage.Cars.Count >= garage.ModelGarage.Capacity,
            Room = garage.ModelGarage.Capacity - garage.Cars.Count,
          }
        })
      })
      .Where(garage => garage.OwnerId == userId);

    if (aQuery == null)
    {
      return await dbQuery.ToListAsync();
    }

    return await dbQuery
      .Where(garage => garage.Name.ToLower().Contains(aQuery) ||
                       garage.Desc.ToLower().Contains(aQuery))
      .ToListAsync();
  }

  public async Task<IEnumerable<JoinedGarageDto>> GetManyJoinedByFilter(Expression<Func<JoinedGarageDto, bool>> aFilter)
  {
    return await _context.Garages
      .Include(garage => garage.ModelGarage)
      .Include(garage => garage.Cars)
      .ThenInclude(car => car.ModelCar)
      .Select(garage => new JoinedGarageDto()
      {
        Id = garage.Id,
        Desc = garage.Desc,
        Name = garage.ModelGarage.Name,
        Type = garage.ModelGarage.Type,
        Capacity = garage.ModelGarage.Capacity,
        Full = garage.Cars.Count >= garage.ModelGarage.Capacity,
        Room = garage.ModelGarage.Capacity - garage.Cars.Count,
        OwnerId = garage.OwnerId,
        Cars = garage.Cars.Select(car => new JoinedCarDto()
        {
          Id = car.Id,
          Name = car.ModelCar.Name,
          Manufacturer = car.ModelCar.Manufacturer,
          Class = car.ModelCar.Class,
          OwnerId = car.OwnerId,
          Garage = new PartialGarageDto()
          {
            Id = garage.Id,
            Desc = garage.Desc,
            Name = garage.ModelGarage.Name,
            Type = garage.ModelGarage.Type,
            Capacity = garage.ModelGarage.Capacity,
            Full = garage.Cars.Count >= garage.ModelGarage.Capacity,
            Room = garage.ModelGarage.Capacity - garage.Cars.Count,
          }
        })
      })
      .ToListAsync();
  }

  public async Task<JoinedGarageDto> GetOneJoinedByFilter(Expression<Func<JoinedGarageDto, bool>> aFilter)
  {
    return await _context.Garages
      .Include(garage => garage.ModelGarage)
      .Include(garage => garage.Cars)
      .ThenInclude(car => car.ModelCar)
      .Select(garage => new JoinedGarageDto()
      {
        Id = garage.Id,
        Desc = garage.Desc,
        Name = garage.ModelGarage.Name,
        Type = garage.ModelGarage.Type,
        Capacity = garage.ModelGarage.Capacity,
        Full = garage.Cars.Count >= garage.ModelGarage.Capacity,
        Room = garage.ModelGarage.Capacity - garage.Cars.Count,
        OwnerId = garage.OwnerId,
        Cars = garage.Cars.Select(car => new JoinedCarDto()
        {
          Id = car.Id,
          Name = car.ModelCar.Name,
          Manufacturer = car.ModelCar.Manufacturer,
          Class = car.ModelCar.Class,
          OwnerId = car.OwnerId,
          Garage = new PartialGarageDto()
          {
            Id = garage.Id,
            Desc = garage.Desc,
            Name = garage.ModelGarage.Name,
            Type = garage.ModelGarage.Type,
            Capacity = garage.ModelGarage.Capacity,
            Full = garage.Cars.Count >= garage.ModelGarage.Capacity,
            Room = garage.ModelGarage.Capacity - garage.Cars.Count,
          }
        })
      })
      .SingleAsync(aFilter);
  }
}