using System.Threading;
using System.Threading.Tasks;

namespace backend.Core.Interfaces
{
    public interface IEmailSender
    {
        Task SendAsync(string to, string subject, string body, CancellationToken ct = default);
    }
}
