namespace backend.Core.Dtos.EmergencyContact
{
    // DTO for sending EmergencyContact data to the client
    public class EmergencyContactDto
    {
        public int EmergencyContactId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Relationship { get; set; }
        public bool IsPrimary { get; set; }
    }

    // DTO for creating or updating an EmergencyContact
    public class EmergencyContactCreateUpdateDto
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Relationship { get; set; }
        public bool IsPrimary { get; set; }
    }
} 