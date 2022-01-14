using Backend.Api.Data;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public class ModelCarRepo : IModelCarRepo
{
  private readonly DataContext _context;

  public ModelCarRepo(DataContext context)
  {
    _context = context;
  }

  public IEnumerable<ModelCar> GetAll()
  {
    return _context.ModelCars.ToList();
  }

  public async Task<ModelCar> GetById(Guid id)
  {
    return await _context.ModelCars.FindAsync(id);
  }

  public async Task Add(ModelCar modelCar)
  {
    _context.ModelCars.Add(modelCar);
    await _context.SaveChangesAsync();
  }

  public async Task Update()
  {
    await _context.SaveChangesAsync();
  }
}