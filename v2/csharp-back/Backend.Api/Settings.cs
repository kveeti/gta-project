namespace Backend.Api
{
  public class Settings
  {
    public string JWT_Refresh_Secret { get; set; }
    public string JWT_Refresh_Iss { get; set; }
    public string JWT_Refresh_Aud { get; set; }
    
    public string JWT_Access_Secret { get; set; }
    public string JWT_Access_Iss { get; set; }
    public string JWT_Access_Aud { get; set; }
    
    public string RefreshTokenCookieName { get; set; }
    public string AccessTokenHeaderName { get; set; }
  }
}