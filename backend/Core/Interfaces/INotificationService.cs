﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using backend.Core.Entities;

namespace backend.Core.Interfaces
{
    public interface INotificationService
    {
        Task SendAsync(string title, string body, string? userId = null);
        Task<IReadOnlyList<Notification>> GetUnreadAsync(string userId, CancellationToken ct = default);
        Task MarkAsReadAsync(Guid notificationId, CancellationToken ct = default);
    }
}
