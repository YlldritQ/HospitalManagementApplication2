using backend.Core.DbContext;
using backend.Core.Dtos.Log;
using backend.Core.Entities;
using backend.Core.Interfaces;
using MongoDB.Driver;
using System.Security.Claims;

namespace backend.Core.Services
{
    public class LogService : ILogService
    {
        private readonly MongoDbContext _mongoContext;

        public LogService(MongoDbContext mongoContext)
        {
            _mongoContext = mongoContext;
        }

        public async Task SaveNewLog(string UserName, string Description)
        {
            var newLog = new Log()
            {
                UserName = UserName,
                Description = Description
            };
            await _mongoContext.Logs.InsertOneAsync(newLog);
        }

        public async Task<IEnumerable<GetLogDto>> GetLogsAsync()
        {
            var logs = await _mongoContext.Logs.Find(_ => true).ToListAsync();
            return logs.Select(q => new GetLogDto
            {
                CreatedAt = q.CreatedAt,
                Description = q.Description,
                UserName = q.UserName,
            }).OrderByDescending(q => q.CreatedAt);
        }

        public async Task<IEnumerable<GetLogDto>> GetMyLogsAsync(ClaimsPrincipal User)
        {
            var logs = await _mongoContext.Logs.Find(q => q.UserName == User.Identity.Name).ToListAsync();
            return logs.Select(q => new GetLogDto
            {
                CreatedAt = q.CreatedAt,
                Description = q.Description,
                UserName = q.UserName,
            }).OrderByDescending(q => q.CreatedAt);
        }
    }
}