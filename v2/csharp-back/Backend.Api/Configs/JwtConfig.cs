namespace Backend.Api.Configs;

public class JwtConfig
{
  public string Refresh_Secret { get; set; }
  public string Refresh_Iss { get; set; }
  public string Refresh_Aud { get; set; }
  
  public string Access_Secret { get; set; }
  public string Access_Iss { get; set; }
  public string Access_Aud { get; set; }
}

