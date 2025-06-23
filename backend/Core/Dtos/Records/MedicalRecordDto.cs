using backend.Core.Dtos.Patient;
using backend.Core.Entities;

namespace backend.Core.Dtos.Records
{
    public class MedicalRecordDto
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public PatientSnapshot PatientInfo { get; set; }
        public DateTime RecordDate { get; set; }
        public string RecordDetails { get; set; }
        public int? DoctorId { get; set; }
        public DoctorSnapshot? DoctorInfo { get; set; }
        public int? NurseId { get; set; }
        public NurseSnapshot? NurseInfo { get; set; }
        public int? PrescriptionId { get; set; }
        public PrescriptionSnapshot? PrescriptionInfo { get; set; }
    }
}
