namespace backend.Core.Entities
{
    public class Lecturer
    {
        public int LecturerId { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
        public ICollection<Lecture> Lectures { get; set; } = new List<Lecture>();
    }
}
