using backend.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailTestController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        public EmailTestController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }

        public class EmailRequest
        {
            public string To { get; set; }
            public string Subject { get; set; }
            public string Body { get; set; }
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] EmailRequest request)
        {
            await _emailSender.SendAsync(request.To, request.Subject, request.Body);
            return Ok($"Email sent to {request.To}");
        }
    }
} 