using System;
using backend.Core.Entities;

namespace backend.Core.Entities
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; } = null!;

        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; } = null!;

        public int? RoomId { get; set; }
        public Room? Room { get; set; }

        // Add other fields if necessary (Reason, Duration, etc.)
    }
}
