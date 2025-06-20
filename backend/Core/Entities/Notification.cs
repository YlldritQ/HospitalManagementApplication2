using System;

namespace backend.Core.Entities
{
    /// <summary>
    /// Defines which channel(s) to use for a notification.
    /// Supports bitwise flags (e.g., Web | Email).
    /// </summary>
    [Flags]
    public enum NotificationChannel
    {
        Web = 1,
        Email = 2
    }

    /// <summary>
    /// Represents a single notification stored in the database and optionally dispatched via SignalR or email.
    /// </summary>
    public class Notification
    {
        /// <summary>
        /// Primary key.
        /// </summary>
        public Guid Id { get; set; } = Guid.NewGuid();

        /// <summary>
        /// Foreign key to the user who should receive the notification.
        /// </summary>
        public string UserId { get; set; } = default!;

        /// <summary>
        /// Navigation property to the user.
        /// </summary>
        public ApplicationUser User { get; set; } = default!;

        /// <summary>
        /// Short title (e.g., shown in toast or e-mail subject).
        /// </summary>
        public string Title { get; set; } = default!;

        /// <summary>
        /// Main message body.
        /// </summary>
        public string Body { get; set; } = default!;

        /// <summary>
        /// Indicates whether the notification has been read by the user.
        /// </summary>
        public bool IsRead { get; set; } = false;

        /// <summary>
        /// Delivery channel(s): Web (SignalR), Email, or both.
        /// </summary>
        public NotificationChannel Channel { get; set; }

        /// <summary>
        /// UTC timestamp of when the notification was created.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
