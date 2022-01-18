using System.ComponentModel.DataAnnotations;
using Backend.Api.GarageDtos;

namespace Backend.Api.Models;

public class Car
{
  [Key] public Guid Id { get; init; }
  
  [Required] public Guid ModelCarId { get; init; }
  
  [Required] public Guid GarageId { get; set; }

  [Required] public Guid OwnerId { get; init; }
  
  
  public virtual User Owner { get; set; }

  public virtual Garage Garage { get; set; }

  public virtual ModelCar ModelCar { get; set; }
}