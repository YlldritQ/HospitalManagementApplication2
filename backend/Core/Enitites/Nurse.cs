using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Core.Entities
{
    public class Nurse : MedicalStaff
    {
        [Required]
        public string Qualifications { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }

        [Required]
        public string UserId { get; set; } = null!;

        public int? DepartmentId { get; set; }

        public virtual ApplicationUser User { get; set; } = null!;
        public virtual Department? Department { get; set; }

        public ICollection<NurseRoom> NurseRooms { get; set; } = new List<NurseRoom>();
        public ICollection<MedicalRecord> MedicalRecords { get; set; } = new List<MedicalRecord>();
    }
}