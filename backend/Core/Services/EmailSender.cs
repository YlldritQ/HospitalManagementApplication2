using backend.Core.Interfaces;
using backend.Core.Settings;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;

namespace backend.Core.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly SmtpClient _client;
        private readonly EmailSettings _settings;

        public EmailSender(IOptions<EmailSettings> options)
        {
            _settings = options.Value;
            _client = new SmtpClient(_settings.Host, _settings.Port)
            {
                Credentials = new NetworkCredential(_settings.User, _settings.Pass),
                EnableSsl = true
            };
        }

        public async Task SendAsync(
            string to,
            string subject,
            string body,
            CancellationToken ct = default)
        {
            using var msg = new MailMessage(_settings.From, to, subject, body)
            { IsBodyHtml = true };

            await _client.SendMailAsync(msg, ct);
        }
    }
}
