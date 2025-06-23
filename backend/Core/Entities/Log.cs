using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Entities
{
    public class Log
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string? UserName { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
