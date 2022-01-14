namespace Backend.Api
{
  public class Settings
  {
    public string JWT_Secret { get; set; }
    public string JWT_Iss { get; set; }
    public string JWT_Aud { get; set; }
  }
}