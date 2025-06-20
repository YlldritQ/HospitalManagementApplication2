using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using backend.Core.DbContext;
using backend.Core.Entities;
using backend.Core.Hubs;
using backend.Core.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext _db;
        private readonly IHubContext<NotificationHub> _hub;

        public NotificationService(ApplicationDbContext db, IHubContext<NotificationHub> hub)
        {
            _db = db;
            _hub = hub;
        }

        public async Task SendAsync(string title, string body, string? userId = null)
        {
            if (!string.IsNullOrWhiteSpace(userId))
            {
                var entity = new Notification
                {
                    UserId = userId,
                    Title = title,
                    Body = body,
                    Channel = NotificationChannel.Web
                };

                _db.Notifications.Add(entity);
                await _db.SaveChangesAsync();
            }

            if (string.IsNullOrWhiteSpace(userId))
                await _hub.Clients.All.SendAsync("ReceiveNotification", title, body);
            else
                await _hub.Clients.User(userId).SendAsync("ReceiveNotification", title, body);
        }

        public async Task<IReadOnlyList<Notification>> GetUnreadAsync(string userId, CancellationToken ct = default)
        {
            return await _db.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync(ct);
        }

        public async Task MarkAsReadAsync(Guid notificationId, CancellationToken ct = default)
        {
            var notification = await _db.Notifications.FindAsync(new object?[] { notificationId }, ct);

            if (notification != null && !notification.IsRead)
            {
                notification.IsRead = true;
                await _db.SaveChangesAsync(ct);
            }
        }
    }
}
