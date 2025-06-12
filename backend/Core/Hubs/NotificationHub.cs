using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace backend.Core.Hubs // ✅ Required for proper import
{
    public class NotificationHub : Hub
    {
        // Optional: send to specific user
        public async Task SendNotification(string user, string message)
        {
            await Clients.User(user).SendAsync("ReceiveNotification", message);
        }

        // Or send to everyone
        public async Task BroadcastNotification(string message)
        {
            await Clients.All.SendAsync("ReceiveNotification", message);
        }
    }
}
