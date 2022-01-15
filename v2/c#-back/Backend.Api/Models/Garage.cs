using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class Garage
{
  [Key] public Guid Id { get; set; }
  [Required] public Guid ModelGarageId { get; set; }
  [Required] public Guid OwnerId { get; set; }
  [Required] public string Desc { get; set; }
}