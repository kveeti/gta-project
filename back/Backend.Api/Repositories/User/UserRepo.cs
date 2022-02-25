using System.Linq.Expressions;
using Backend.Api.Data;
using Backend.Api.Models;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Backend.Api.Dtos;

namespace Backend.Api.Repositories;

public class UserRepo : GenericRepo<User>, IUserRepo
{
  private readonly DataContext _context;

  public UserRepo(DataContext aContext) : base(aContext)
  {
    _context = aContext;
  }

  public async Task<ReturnUserDto> GetOne(Guid aId)
  {
    return await _context.Users
      .AsNoTracking()
      .Include(user => user.Cars)
        .ThenInclude(car => car.ModelCar)
      .Include(user => user.Cars)
        .ThenInclude(car => car.Garage)
      .Include(user => user.Garages)
      .ThenInclude(garage => garage.ModelGarage)
        .Select(user => new ReturnUserDto
        {
          Id = user.Id,
          Username = user.Username,
          Role = user.Role,
          Email = user.Email,
          EmailVerified = user.EmailVerifyToken == null,
          CarCount = user.Cars.Count,
          GarageCount = user.Garages.Count,
          IsTestAccount = user.IsTestAccount,
          Garages = user.Garages.Select(garage => new JoinedGarageDto()
          {
            Id = garage.Id,
            Desc = garage.Desc,
            Name = garage.ModelGarage.Name,
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
                Capacity = garage.ModelGarage.Capacity,
                Full = garage.Cars.Count >= garage.ModelGarage.Capacity,
                Room = garage.ModelGarage.Capacity - garage.Cars.Count,
              }
            })
          }),
          Cars = user.Cars.Select(car => new JoinedCarDto()
          {
            Id = car.Id,
            Name = car.ModelCar.Name,
            Manufacturer = car.ModelCar.Manufacturer,
            Class = car.ModelCar.Class,
            OwnerId = car.OwnerId,
            Garage = new PartialGarageDto()
            {
              Id = car.Garage.Id,
              Desc = car.Garage.Desc,
              Name = car.Garage.ModelGarage.Name,
              Capacity = car.Garage.ModelGarage.Capacity,
              Full = car.Garage.Cars.Count >= car.Garage.ModelGarage.Capacity,
              Room = car.Garage.ModelGarage.Capacity - car.Garage.Cars.Count,
            }
          })

        })
      .SingleOrDefaultAsync(user => user.Id == aId);
  }

  public async Task<IEnumerable<User>> GetMany([CanBeNull] Expression<Func<User, bool>> aFilter = null)
  {
    var dbQuery = _context.Users
      .AsNoTracking()
      .Include(user => user.Cars)
      .Include(user => user.Garages);

    if (aFilter == null) return await dbQuery.ToListAsync();

    return await dbQuery.Where(aFilter).ToListAsync();
  }
}