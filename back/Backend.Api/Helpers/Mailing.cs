using System.Net;
using Backend.Api.Configs;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace Backend.Api.Helpers;

public class Mailing : IMailing
{
  private readonly IOptions<EmailConfig> _config;

  public Mailing(IOptions<EmailConfig> aConfig)
  {
    _config = aConfig;
  }

  public async Task SendEmailConfirmation(string receiversEmail, string linkId)
  {
    var emailToSend = new MimeMessage();

    emailToSend.From.Add(new MailboxAddress(_config.Value.FromName, _config.Value.FromEmail));
    emailToSend.To.Add(new MailboxAddress("", receiversEmail));

    var link = $"{_config.Value.VerifyLinkBase}/{linkId}";

    emailToSend.Subject = $"Email confirmation on {_config.Value.LocalDomain}";
    var message = $"<h1>Hello!</h1>" +
                  $"<p>Confirm your email on <b>{_config.Value.LocalDomain}</b> by clicking the link below:</p>" +
                  $"<a href=\"{link}\" target=\"_blank\">{link}</a>" +
                  "<br><br>" +
                  "<b>If you weren't expecting a confirmation email, you should ignore this.</b>";

    emailToSend.Body = new TextPart(TextFormat.Html) { Text = message };

    await SendMail(emailToSend);
  }

  public async Task SendPasswordChanged(string receiversEmail)
  {
    var emailToSend = new MimeMessage();

    emailToSend.From.Add(new MailboxAddress(_config.Value.FromName, _config.Value.FromEmail));
    emailToSend.To.Add(new MailboxAddress("", receiversEmail));

    emailToSend.Subject = $"Password changed on {_config.Value.LocalDomain}";
    var message = $"<h1>Hey!</h1>" +
                  $"<p>Your password just got changed!</p>";

    emailToSend.Body = new TextPart(TextFormat.Html) { Text = message };

    await SendMail(emailToSend);
  }

  public async Task SendAccountDeleted(string receiversEmail)
  {
    var emailToSend = new MimeMessage();

    emailToSend.From.Add(new MailboxAddress(_config.Value.FromName, _config.Value.FromEmail));
    emailToSend.To.Add(new MailboxAddress("", receiversEmail));

    emailToSend.Subject = $"Password changed on {_config.Value.LocalDomain}";
    var message = $"<h1>Hey!</h1>" +
                  $"<p>Your password just got changed!</p>";

    emailToSend.Body = new TextPart(TextFormat.Html) { Text = message };

    await SendMail(emailToSend);
  }

  public async Task SendPasswordReset(string receiversEmail, string linkId)
  {
    var emailToSend = new MimeMessage();

    emailToSend.From.Add(new MailboxAddress(_config.Value.FromName, _config.Value.FromEmail));
    emailToSend.To.Add(new MailboxAddress("", receiversEmail));

    var link = $"{_config.Value.PasswordResetBase}/{linkId}";

    emailToSend.Subject = $"Password reset request on {_config.Value.LocalDomain}";
    var message = $"<h1>Hello!</h1>" +
                  $"<p>A password reset was requested. Click the link below to reset your password.</p>" +
                  $"<a href=\"{link}\" target=\"_blank\">{link}</a>" +
                  "<br><br>" +
                  "<b>If you didn't initiate the password reset, you should ignore this.</b>";

    emailToSend.Body = new TextPart(TextFormat.Html) { Text = message };

    await SendMail(emailToSend);
  }

  private async Task SendMail(MimeMessage message)
  {
    try
    {
      using var client = new SmtpClient();
      client.LocalDomain = _config.Value.LocalDomain;

      await client.ConnectAsync(
        _config.Value.MailServerUrl,
        Convert.ToInt32(_config.Value.MailServerPort),
        SecureSocketOptions.Auto).ConfigureAwait(false);
      await client.AuthenticateAsync(
        new NetworkCredential(_config.Value.MailServerUsername, _config.Value.MailServerPassword));
      await client.SendAsync(message).ConfigureAwait(false);
      await client.DisconnectAsync(true).ConfigureAwait(false);
    }
    catch (Exception e)
    {
      Console.Write(e);
    }
  }
}