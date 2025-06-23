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
using MongoDB.Driver;

namespace backend.Core.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext _db;
        private readonly MongoDbContext _mongoContext;
        private readonly IHubContext<NotificationHub> _hub;
        private readonly IEmailSender _emailSender;

        public NotificationService(ApplicationDbContext db, MongoDbContext mongoContext, IHubContext<NotificationHub> hub, IEmailSender emailSender)
        {
            _db = db;
            _mongoContext = mongoContext;
            _hub = hub;
            _emailSender = emailSender;
        }

        public async Task SendAsync(string title, string body, NotificationChannel channel = NotificationChannel.Web, string? userId = null)
        {
            if (!string.IsNullOrWhiteSpace(userId))
            {
                var entity = new Notification
                {
                    UserId = userId,
                    Title = title,
                    Body = body,
                    Channel = channel
                };
                await _mongoContext.Notifications.InsertOneAsync(entity);
                if(channel.HasFlag(NotificationChannel.Email))
                {
                    var user = await _db.Users.FindAsync(userId);
                    if(user != null && !string.IsNullOrEmpty(user.Email))
                    {
                        await _emailSender.SendAsync(user.Email, title, body);
                    }
                }
            }
            // If Web flag is set, send via SignalR
            if (channel.HasFlag(NotificationChannel.Web))
            {
                if (string.IsNullOrWhiteSpace(userId))
                    await _hub.Clients.All.SendAsync("ReceiveNotification", title, body);
                else
                    await _hub.Clients.User(userId).SendAsync("ReceiveNotification", title, body);
            }
        }

        public async Task<IReadOnlyList<Notification>> GetUnreadAsync(string userId, CancellationToken ct = default)
        {
            var filter = Builders<Notification>.Filter.Where(n => n.UserId == userId && !n.IsRead);
            return await _mongoContext.Notifications.Find(filter).SortByDescending(n => n.CreatedAt).ToListAsync(ct);
        }

        public async Task MarkAsReadAsync(string notificationId, CancellationToken ct = default)
        {
            var filter = Builders<Notification>.Filter.Eq(n => n.Id, notificationId);
            var update = Builders<Notification>.Update.Set(n => n.IsRead, true);
            await _mongoContext.Notifications.UpdateOneAsync(filter, update, cancellationToken: ct);
        }
    }
}
