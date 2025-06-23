using MongoDB.Driver;
using Microsoft.Extensions.Options;
using Core.Entities;
using Core.Settings;

namespace Core.DbContext
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var client = new MongoClient(mongoDbSettings.Value.ConnectionString);
            _database = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
        }

        // Example: Expose a collection for Notification entity
        public IMongoCollection<Notification> Notifications => _database.GetCollection<Notification>("Notifications");

        // Add more collections as needed
    }
} 