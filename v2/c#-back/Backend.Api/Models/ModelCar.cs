using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class ModelCar
{
  [Key] public Guid Id { get; set; }
  [Required] public string Name { get; set; }
  [Required] public string Manufacturer { get; set; }
  [Required] public string Class { get; set; }
  
  
  public virtual ICollection<Car> Cars { get; set; }
}