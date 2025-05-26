using backend.Core.Entities;

public class Appointment
{
    public int Id { get; set; }
    public DateTime AppointmentDate { get; set; }
    public int PatientId { get; set; }
    public string Status { get; set; }

    public virtual Patient Patient { get; set; }

}
