namespace Backend.Api.Helpers;

public static class Sanitize
{
  public static string GetGoodQuery(string badQuery)
  {
    return badQuery.ToLower().Trim();
  }
} 