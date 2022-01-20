using System.ComponentModel.DataAnnotations;

namespace Backend.Api.Models;

public class User
{
  [Key] public Guid Id { get; set; }
  [Required] public string Email { get; set; }
  [Required] public string Username { get; set; }
  [Required] public string Password { get; set; }
  [Required] public string Role { get; set; }
  [Required] public int TokenVersion { get; set; }
  
  
  public virtual ICollection<Car> Cars { get; set; }
  public virtual ICollection<Garage> Garages { get; set; }
}