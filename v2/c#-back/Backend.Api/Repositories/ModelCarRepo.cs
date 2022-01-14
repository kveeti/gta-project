using Backend.Api.Data;
using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class ModelCarRepo : IModelCarRepo
{
  private readonly DataContext _context;

  public ModelCarRepo(DataContext aContext)
  {
    _context = aContext;
  }

  public async Task<IEnumerable<ModelCar>> GetAll()
  {
    return await _context.ModelCars.ToListAsync();
  }

  public async Task<ModelCar> GetById(Guid aId)
  {
    return await _context.ModelCars.FindAsync(aId);
  }

  public async Task<ModelCar> GetByName(string aName)
  {
    return await _context.ModelCars.FirstOrDefaultAsync(car => car.Name == aName);
  }

  public async Task Add(ModelCar aModelCar)
  {
    _context.ModelCars.Add(aModelCar);
    await _context.SaveChangesAsync();
  }

  public async Task Update()
  {
    await _context.SaveChangesAsync();
  }
}