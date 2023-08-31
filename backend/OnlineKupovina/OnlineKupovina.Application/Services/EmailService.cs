using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using System;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using OnlineKupovina.Application.ServiceInterfaces;
using System.Text.RegularExpressions;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Net.Mail;

namespace OnlineKupovina.Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {

            _config = config;
        }

        public Task SendEmail(string to, string subject, string body)
        {
            //var message = new MimeMessage();
            //message.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            //message.To.Add(MailboxAddress.Parse(to));
            //message.Subject = subject;

            //message.Body = new TextPart(TextFormat.Plain)
            //{
            //    Text = body
            //};

            //using var smtp = new SmtpClient();
            //await smtp.ConnectAsync(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            //await smtp.AuthenticateAsync(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            //await smtp.SendAsync(message);
            //await smtp.DisconnectAsync(true);

            var mail = "hocusuicid@gmail.com";
            var pw = "ttobxbwgptuolbvk";

            var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, pw)

            };

            return client.SendMailAsync(new MailMessage(from: mail, to: to, subject, body));
        }

        public bool IsValidEmail(string email)
        {
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            Regex regex = new(pattern);

            return regex.IsMatch(email);
        }

    }
}
