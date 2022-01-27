namespace Backend.Api.Helpers;

public interface IMailing
{
  public Task SendEmailConfirmation(string receiversEmail, string linkId);

  public Task SendPasswordChanged(string receiversEmail);
}