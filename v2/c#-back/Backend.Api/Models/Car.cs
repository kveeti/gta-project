using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class Car
{
  [Key] public Guid Id { get; set; }
  
  [Required] public Guid ModelCarId { get; set; }
  
  [Required] public Guid GarageId { get; set; }

  [Required] public Guid OwnerId { get; set; }
}