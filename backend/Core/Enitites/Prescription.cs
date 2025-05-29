using System;
using backend.Core.Entities;

namespace backend.Core.Entities
{
    public class Prescription
    {
        public int Id { get; set; }
        public string MedicineName { get; set; } = string.Empty;
        public string Dosage { get; set; } = string.Empty;
        public DateTime DateIssued { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;

        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; } = null!;

        public MedicalRecord? MedicalRecord { get; set; }
    }
}
