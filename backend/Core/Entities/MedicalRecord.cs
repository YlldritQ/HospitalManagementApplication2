using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Entities
{
    public class MedicalRecord
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int PatientId { get; set; }
        public PatientSnapshot PatientInfo { get; set; }
        public DateTime RecordDate { get; set; }
        public string RecordDetails { get; set; } = null!;
        public int? DoctorId { get; set; }
        public DoctorSnapshot? DoctorInfo { get; set; }
        public int? NurseId { get; set; }
        public NurseSnapshot? NurseInfo { get; set; }
        public int? PrescriptionId { get; set; }
        public PrescriptionSnapshot? PrescriptionInfo { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class PatientSnapshot
    {
        public int PatientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string ContactInfo { get; set; }
        public string UserId { get; set; }
    }
    public class DoctorSnapshot
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string ContactInfo { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateHired { get; set; }
        public string Specialty { get; set; }
        public string Qualifications { get; set; }
        public bool IsAvailable { get; set; }
        public int DepartmentId { get; set; }
        public string UserId { get; set; }
    }
    public class NurseSnapshot
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string ContactInfo { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime DateHired { get; set; }
        public string Qualifications { get; set; }
        public bool IsAvailable { get; set; }
        public int DepartmentId { get; set; }
        public string UserId { get; set; }
    }
    public class PrescriptionSnapshot
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string PatientName { get; set; }
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public DateTime DateIssued { get; set; }
        public string MedicationName { get; set; }
        public string Dosage { get; set; }
        public string Instructions { get; set; }
    }
}
