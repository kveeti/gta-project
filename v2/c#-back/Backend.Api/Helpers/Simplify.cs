using Backend.Api.CarDtos;
using Backend.Api.GarageDtos;
using Backend.Api.Models;
using Backend.Api.Repositories;

namespace Backend.Api.Helpers;

public class Simplify : ISimplify
{
  private readonly IGenericRepo<Car> _carRepo;
  private readonly IGenericRepo<Garage> _garageRepo;
  private readonly IGenericRepo<ModelCar> _modelCarRepo;
  private readonly IGenericRepo<ModelGarage> _modelGarageRepo;

  public Simplify(
    IGenericRepo<Car> aCarRepo,
    IGenericRepo<Garage> aGarageRepo,
    IGenericRepo<ModelCar> aModelCarRepo,
    IGenericRepo<ModelGarage> aModelGarageRepo
  )
  {
    _carRepo = aCarRepo;
    _garageRepo = aGarageRepo;
    _modelCarRepo = aModelCarRepo;
    _modelGarageRepo = aModelGarageRepo;
  }

  public async Task<IEnumerable<SimplifiedCarDto>> GetSimplifiedCarsForUser(Guid aUserId)
  {
    var cars = await _carRepo
      .GetManyByFilter(c => c.OwnerId == aUserId);

    var garages = await _garageRepo
      .GetManyByFilter(g => g.OwnerId == aUserId);

    var modelCars = await _modelCarRepo
      .GetAll();

    var modelGarages = await _modelGarageRepo.GetAll();

    return cars.Join(garages,
      c => c.GarageId,
      g => g.Id,
      (car, garage) => new {Car = car, Garage = garage}
    ).Join(modelGarages,
      comb => comb.Garage.ModelGarageId,
      mg => mg.Id,
      (comb, mGarage) => new
      {
        Id = comb.Car.Id,
        ModelCarId = comb.Car.ModelCarId,
        Garage = new PartiallySimplifiedGarageDto()
        {
          Id = mGarage.Id,
          Name = mGarage.Name,
          Desc = comb.Garage.Desc,
          Capacity = mGarage.Capacity,
          Type = mGarage.Type
        }
      }).Join(modelCars,
      comb2 => comb2.ModelCarId,
      mCar => mCar.Id,
      (comb2, mCar) => new SimplifiedCarDto()
      {
        Id = comb2.Id,
        Name = mCar.Name,
        Manufacturer = mCar.Manufacturer,
        Class = mCar.Class,
        Garage = comb2.Garage
      }
    ).ToList();
  }

  

  public async Task<SimplifiedGarageDto> GetOneSimplifiedGarage(Garage garage)
  {
    var modelGarage = await _modelGarageRepo
      .GetOneByFilter(modelGarage => modelGarage.Id == garage.ModelGarageId);

    return new SimplifiedGarageDto()
    {
      Id = garage.Id,
      Name = modelGarage.Name,
      Desc = garage.Desc,
      Capacity = modelGarage.Capacity,
      Type = modelGarage.Type,
      Cars = await GetSimplifiedCarsForGarage(garage)
    };
  }

  public async Task<SimplifiedCarDto> GetOneSimplifiedCar(Car car)
  {
    var garage = await _garageRepo
      .GetOneByFilter(garage => garage.Id == car.GarageId);

    var modelCar = await _modelCarRepo
      .GetOneByFilter(modelCar => modelCar.Id == car.ModelCarId);

    var modelGarage = await _modelGarageRepo
      .GetOneByFilter(modelGarage => modelGarage.Id == garage.ModelGarageId);

    return new SimplifiedCarDto()
    {
      Id = car.Id,
      Name = modelCar.Name,
      Class = modelCar.Class,
      Manufacturer = modelCar.Manufacturer,
      Garage = new PartiallySimplifiedGarageDto()
      {
        Id = garage.Id,
        Name = modelGarage.Name,
        Desc = garage.Desc,
        Capacity = modelGarage.Capacity,
        Type = modelGarage.Type
      }
    };
  }


  // --- PRIVATE METHODS ---

  private async Task<IEnumerable<SimplifiedCarDto>> GetSimplifiedCarsForGarage(Guid aGarageId)
  {
    var garage = await _garageRepo.GetOneByFilter(garage => garage.Id == aGarageId);
    var carsInGarage = await _carRepo.GetManyByFilter(car => car.GarageId == garage.Id);
    var modelGarage = await _modelGarageRepo.GetOneByFilter(modelGarage => modelGarage.Id == garage.ModelGarageId);

    var modelCars = await _modelCarRepo.GetAll();

    return carsInGarage.Join(modelCars,
      car => car.ModelCarId,
      modelCar => modelCar.Id,
      (car, modelCar) => new SimplifiedCarDto()
      {
        Id = car.Id,
        Name = modelCar.Name,
        Manufacturer = modelCar.Manufacturer,
        Class = modelCar.Class,
        Garage = new PartiallySimplifiedGarageDto()
        {
          Id = garage.Id,
          Name = modelGarage.Name,
          Desc = garage.Desc,
          Capacity = modelGarage.Capacity,
          Type = modelGarage.Type
        }
      }).ToList();
  }
  
  public async Task<IEnumerable<SimplifiedGarageDto>> GetSimplifiedGaragesForUser(Guid aUserId)
  {
    var cars = await _carRepo
      .GetManyByFilter(car => car.OwnerId == aUserId);

    var garages = await _garageRepo
      .GetManyByFilter(garage => garage.OwnerId == aUserId);

    var modelCars = await _modelCarRepo.GetAll();
    var modelGarages = await _modelGarageRepo.GetAll();

    return garages.Join(modelGarages,
      garage => garage.ModelGarageId,
      modelGarage => modelGarage.Id,
      (garage, modelGarage) => new
      {
        Garage = garage,
        ModelGarage = modelGarage
      }).Select(combined => new SimplifiedGarageDto()
    {
      Id = combined.Garage.Id,
      Name = combined.ModelGarage.Name,
      Desc = combined.Garage.Desc,
      Capacity = combined.ModelGarage.Capacity,
      Type = combined.ModelGarage.Type,
      Cars = GetSimplifiedCarsForGarage(
        combined.Garage,
        combined.ModelGarage,
        modelCars,
        cars.Where(car => car.GarageId == combined.Garage.Id))
    }).ToList();
  }

  private IEnumerable<SimplifiedCarDto> GetSimplifiedCarsForGarage(
    Garage garage,
    ModelGarage modelGarage,
    IEnumerable<ModelCar> modelCars,
    IEnumerable<Car> carsInGarage
  )
  {
    return carsInGarage.Join(modelCars,
      car => car.ModelCarId,
      modelCar => modelCar.Id,
      (car, modelCar) => new SimplifiedCarDto()
      {
        Id = car.Id,
        Name = modelCar.Name,
        Manufacturer = modelCar.Manufacturer,
        Class = modelCar.Class,
        Garage = new PartiallySimplifiedGarageDto()
        {
          Id = garage.Id,
          Name = modelGarage.Name,
          Desc = garage.Desc,
          Capacity = modelGarage.Capacity,
          Type = modelGarage.Type
        }
      }).ToList();
  }

  private async Task<IEnumerable<SimplifiedCarDto>> GetSimplifiedCarsForGarage(Garage garage)
  {
    var carsInGarage = await _carRepo.GetManyByFilter(car => car.GarageId == garage.Id);
    var modelGarage = await _modelGarageRepo.GetOneByFilter(modelGarage => modelGarage.Id == garage.ModelGarageId);

    var modelCars = await _modelCarRepo.GetAll();

    return carsInGarage.Join(modelCars,
      car => car.ModelCarId,
      modelCar => modelCar.Id,
      (car, modelCar) => new SimplifiedCarDto()
      {
        Id = car.Id,
        Name = modelCar.Name,
        Manufacturer = modelCar.Manufacturer,
        Class = modelCar.Class,
        Garage = new PartiallySimplifiedGarageDto()
        {
          Id = garage.Id,
          Name = modelGarage.Name,
          Desc = garage.Desc,
          Capacity = modelGarage.Capacity,
          Type = modelGarage.Type
        }
      }).ToList();
  }
}