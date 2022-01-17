using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class Garage
{
  [Key] public Guid Id { get; init; }
  [Required] public Guid ModelGarageId { get; init; }
  [Required] public Guid OwnerId { get; init; }
  [Required] public string Desc { get; init; }
}