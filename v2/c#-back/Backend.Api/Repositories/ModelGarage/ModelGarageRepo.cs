using Backend.Api.Data;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Backend.Api.Repositories.ModelGarage;

public class ModelGarageRepo : GenericRepo<Models.ModelGarage>, IModelGarageRepo
{
  private readonly DataContext _context;

  public ModelGarageRepo(DataContext aContext) : base(aContext)
  {
    _context = aContext;
  }

  public async Task<IEnumerable<Models.ModelGarage>> GetMatching([CanBeNull] string aQuery = null)
  {
    var dbQuery = _context.ModelGarages
      .AsNoTracking();
    
    if (aQuery == null)
    {
      return await dbQuery.ToListAsync();
    }
    
    return await dbQuery
      .Where(modelGarage => modelGarage.Name.ToLower().Contains(aQuery))
      .ToListAsync();
  }
}