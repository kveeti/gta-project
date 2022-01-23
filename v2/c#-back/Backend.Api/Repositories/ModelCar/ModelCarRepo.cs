using Backend.Api.Data;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories.ModelCar;

public class ModelCarRepo : GenericRepo<Models.ModelCar>, IModelCarRepo
{
  private readonly DataContext _context;

  public ModelCarRepo(DataContext aContext) : base(aContext)
  {
    _context = aContext;
  }

  public async Task<IEnumerable<Models.ModelCar>> GetMatching([CanBeNull] string aQuery = null)
  {
    var dbQuery = _context.ModelCars
      .AsNoTracking();

    if (aQuery == null)
    {
      return await dbQuery.ToListAsync();
    }

    return await dbQuery
      .Where(modelCar => modelCar.Name.ToLower().Contains(aQuery) ||
                         modelCar.Manufacturer.ToLower().Contains(aQuery))
      .ToListAsync();
  }
}