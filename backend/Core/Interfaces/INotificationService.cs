using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using backend.Core.Dtos.General;
using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface INotificationService
    {
        Task SendAsync(string title, string body, NotificationChannel channel, string? userId = null);
        Task<IReadOnlyList<Notification>> GetUnreadAsync(string userId, CancellationToken ct = default);
        Task<GeneralServiceResponseDto> MarkAsReadAsync(string notificationId, CancellationToken ct = default);
    }
}
