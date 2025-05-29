using System;
using System.Collections.Generic;
using backend.Core.Enitites;
using backend.Core.Entities;

namespace backend.Core.Entities
{
    public class Doctor : MedicalStaff
    {
        public string Specialty { get; set; } = null!;
        public string Qualifications { get; set; } = null!;
        public bool IsAvailable { get; set; }
        public int? DepartmentId { get; set; }

        public string UserId { get; set; } = null!;

        public virtual ApplicationUser User { get; set; } = null!;
        public virtual Department? Department { get; set; }

        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();
        public ICollection<DoctorRoom> DoctorRooms { get; set; } = new List<DoctorRoom>();
        public ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();
    }
}
