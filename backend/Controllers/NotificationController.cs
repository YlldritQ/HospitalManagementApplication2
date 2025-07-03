using backend.Core.Entities;
using backend.Core.Interfaces;
using backend.Migrations;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        public NotificationController(INotificationService notificationService)
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

        [HttpGet("getNotificationsByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotificatonsByUserId(string userId)
        {
            var notifications = await _notificationService.GetUnreadAsync(userId);

            if(notifications == null)
            {
                return NotFound($"No notifications found for user {userId}");
            }

            return Ok(notifications);
        }

        [HttpGet("getAllNotificationsByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotificatonsByUserId(string userId)
        {
            var notifications = await _notificationService.GetAllAsync(userId);

            if (notifications == null)
            {
                return NotFound($"No notifications found for user {userId}");
            }

            return Ok(notifications);
        }
        public class MarkAsReadRequest
        {
            public string NotificationId { get; set; }
        }

        [HttpPost("markAsReadNotification")]
        public async Task<IActionResult> MarkAsReadNotification([FromBody] MarkAsReadRequest request)
        {
            var result = await _notificationService.MarkAsReadAsync(request.NotificationId);
            if (result.StatusCode == 200)
            {
                return Ok($"Notification {request.NotificationId} marked as read.");
            }
            return NotFound($"Notification {request.NotificationId} not found.");
        }
    }
} 