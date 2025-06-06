namespace backend.Core.Entities
{
    public class Lecture
    {
        public int LectureId { get; set; }
        public string Name { get; set; }
        public int LecturerId { get; set; }
        public Lecturer Lecturer { get; set; }

    }
}
