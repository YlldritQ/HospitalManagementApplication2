using Core.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using backend.Core.Entities;

namespace backend.Core.DbContext
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<Log> Logs => _database.GetCollection<Log>("Logs");
        public IMongoCollection<Notification> Notifications => _database.GetCollection<Notification>("Notifications");
        public IMongoCollection<MedicalRecord> MedicalRecords => _database.GetCollection<MedicalRecord>("MedicalRecords");
    }
}
