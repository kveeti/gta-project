using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class ModelGarage
{
  [Key] public Guid Id { get; set; }
  [Required] public string Name { get; set; }
  [Required] public int Capacity { get; set; }
  [Required] public string Type { get; set; }
  
  public virtual ICollection<Garage> Garages { get; set; }
}