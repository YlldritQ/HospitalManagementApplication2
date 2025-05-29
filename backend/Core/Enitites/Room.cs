using System.Collections.Generic;

namespace backend.Core.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public string RoomNumber { get; set; } = string.Empty;
        public bool IsOccupied { get; set; }

        public int? DepartmentId { get; set; }
        public virtual Department? Department { get; set; }

        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<DoctorRoom> DoctorRooms { get; set; } = new List<DoctorRoom>();
        public ICollection<NurseRoom> NurseRooms { get; set; } = new List<NurseRoom>();
    }
}
