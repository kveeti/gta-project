using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class Garage
{
  [Key] public Guid Id { get; set; }
  [Required] public Guid ModelGarageId { get; init; }
  [Required] public Guid OwnerId { get; init; }
  [Required] public string Desc { get; init; }
  
  
  public virtual User Owner { get; set; }

  public ICollection<Car> Cars { get; set; }

  public virtual ModelGarage ModelGarage { get; set; }
}