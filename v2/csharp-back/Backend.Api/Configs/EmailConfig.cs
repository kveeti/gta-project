namespace Backend.Api.Configs;

public class EmailConfig
{
  public string FromName { get; set; }
  public string FromEmail { get; set; } 
  public string LocalDomain { get; set; }
  public string MailServerUrl { get; set; }
  public string MailServerPort { get; set; }
  public string MailServerUsername { get; set; }
  public string MailServerPassword { get; set; }
  
  public string SiteName { get; set; }
  public string VerifyLinkBaseUrl { get; set; }
}