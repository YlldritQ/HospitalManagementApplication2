using System;
using backend.Core.Entities;

namespace backend.Core.Entities
{
    public class MedicalRecord
    {
        public int Id { get; set; }
        public string Diagnosis { get; set; } = string.Empty;
        public string Treatment { get; set; } = string.Empty;
        public DateTime DateCreated { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;

        public int? DoctorId { get; set; }
        public Doctor? Doctor { get; set; }

        public int? NurseId { get; set; }
        public Nurse? Nurse { get; set; }

        public int? PrescriptionId { get; set; }
        public Prescription? Prescription { get; set; }
    }
}
