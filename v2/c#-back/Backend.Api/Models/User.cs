using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class User
{
  [Key] public Guid Id { get; set; }
  [Required] public string Username { get; set; }
  [Required] public string Password { get; set; }
  [Required] public string Role { get; set; }
  
  
  public ICollection<Car> Cars { get; set; }
  public ICollection<Garage> Garages { get; set; }
}