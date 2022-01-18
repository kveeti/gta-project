using System.Linq.Expressions;
using Backend.Api.CarDtos;
using Backend.Api.Data;
using Backend.Api.GarageDtos;
using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class CarRepo : GenericRepo<Car>, ICarRepo
{
  private readonly DataContext _context;

  public CarRepo(DataContext context) : base(context)
  {
    _context = context;
  }

  public async Task<IEnumerable<JoinedCarDto>> GetManyByFilter(Expression<Func<JoinedCarDto, bool>> aFilter)
  {
    return await _context.Cars
      .Include(car => car.ModelCar)
      .Include(car => car.Garage)
      .ThenInclude(garage => garage.ModelGarage)
      .Select(car => new JoinedCarDto()
      {
        Id = car.Id,
        Name = car.ModelCar.Name,
        Manufacturer = car.ModelCar.Manufacturer,
        Class = car.ModelCar.Class,
        OwnerId = car.OwnerId,
        Garage = new PartialGarageDto()
        {
          Id = car.GarageId,
          Name = car.Garage.ModelGarage.Name,
          Desc = car.Garage.Desc,
          Capacity = car.Garage.ModelGarage.Capacity,
          Type = car.Garage.ModelGarage.Type
        }
      })
      .Where(aFilter)
      .ToListAsync();
  }

  public async Task<JoinedCarDto> GetOneByFilter(Expression<Func<JoinedCarDto, bool>> aFilter)
  {
    return await _context.Cars
      .Include(car => car.ModelCar)
      .Include(car => car.Garage)
      .ThenInclude(garage => garage.ModelGarage)
      .Select(car => new JoinedCarDto()
      {
        Id = car.Id,
        Name = car.ModelCar.Name,
        Manufacturer = car.ModelCar.Manufacturer,
        Class = car.ModelCar.Class,
        OwnerId = car.OwnerId,
        Garage = new PartialGarageDto()
        {
          Id = car.GarageId,
          Name = car.Garage.ModelGarage.Name,
          Desc = car.Garage.Desc,
          Capacity = car.Garage.ModelGarage.Capacity,
          Type = car.Garage.ModelGarage.Type
        }
      })
      .SingleAsync(aFilter);
  }

  public async Task<IEnumerable<Car>> GetManyNotJoinedById(Expression<Func<Car, bool>> aFilter)
  {
    return await _context.Cars.Where(aFilter).ToListAsync();
  }
}