using backend.Core.Entities;
using backend.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationTestController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        public NotificationTestController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        public class NotificationRequest
        {
            public string UserId { get; set; }
            public string Title { get; set; }
            public string Body { get; set; }
            public string Channel { get; set; } // e.g. "Web", "Email", "Web,Email"
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] NotificationRequest request)
        {
            if (!Enum.TryParse<NotificationChannel>(request.Channel.Replace(",", ", "), true, out var channel))
            {
                // Support comma-separated values
                channel = 0;
                foreach (var part in request.Channel.Split(",", StringSplitOptions.RemoveEmptyEntries))
                {
                    if (Enum.TryParse<NotificationChannel>(part.Trim(), true, out var flag))
                        channel |= flag;
                }
            }

            await _notificationService.SendAsync(request.Title, request.Body, channel,  request.UserId);
            return Ok($"Notification sent to {request.UserId} via {channel}");
        }
    }
} 