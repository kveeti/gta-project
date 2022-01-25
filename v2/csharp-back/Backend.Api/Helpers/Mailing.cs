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

    var link = $"{_config.Value.VerifyLinkBaseUrl}/{linkId}";

    emailToSend.Subject = $"Email confirmation on {_config.Value.SiteName}";
    var message = $"<h1>Hello!</h1>" +
                  $"<p>Confirm your email on <b>{_config.Value.SiteName}</b> by clicking the link below:</p>" +
                  $"<a href=\"{link}\" target=\"_blank\">{link}</a>" +
                  "<br><br>" +
                  "<b>If you weren't expecting a confirmation email, you should ignore this.</b>";

    emailToSend.Body = new TextPart(TextFormat.Html) {Text = message};

    try
    {
      using (var client = new SmtpClient())
      {
        client.LocalDomain = _config.Value.LocalDomain;

        await client.ConnectAsync(
          _config.Value.MailServerUrl,
          Convert.ToInt32(_config.Value.MailServerPort),
          SecureSocketOptions.Auto).ConfigureAwait(false);
        await client.AuthenticateAsync(
          new NetworkCredential(_config.Value.MailServerUsername, _config.Value.MailServerPassword));
        await client.SendAsync(emailToSend).ConfigureAwait(false);
        await client.DisconnectAsync(true).ConfigureAwait(false);
      }
    }
    catch (Exception e)
    {
      Console.Write(e);
    }
  }
}