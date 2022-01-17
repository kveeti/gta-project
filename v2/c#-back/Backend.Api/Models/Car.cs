using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class Car
{
  [Key] public Guid Id { get; init; }
  
  [Required] public Guid ModelCarId { get; init; }
  
  [Required] public Guid GarageId { get; set; }

  [Required] public Guid OwnerId { get; init; }
}