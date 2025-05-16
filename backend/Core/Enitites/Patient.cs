namespace backend.Core.Entities
{
    public class Patient
    {
        public int PatientId { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public string Phone { get; set; }
    }
}
