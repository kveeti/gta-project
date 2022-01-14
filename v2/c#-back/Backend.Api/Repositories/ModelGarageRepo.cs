using Backend.Api.Data;
using Backend.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories;

public class ModelGarageRepo : IModelGarageRepo
{
  private readonly DataContext _context;

  public ModelGarageRepo(DataContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<ModelGarage>> GetAll()
  {
    return await _context.ModelGarages.ToListAsync();
  }

  public async Task<ModelGarage> GetById(Guid aId)
  {
    return await _context.ModelGarages.FindAsync(aId);
  }

  public async Task<ModelGarage> GetByName(string aName)
  {
    return await _context.ModelGarages
      .FirstOrDefaultAsync(garage => garage.Name == aName);
  }

  public async Task Add(ModelGarage modelGarage)
  {
    await _context.AddAsync(modelGarage);
  }

  public async Task Update()
  {
    await _context.SaveChangesAsync();
  }
}