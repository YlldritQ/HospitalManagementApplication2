import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLectureByID, getLecturers, updateLecture } from "../../services/testServices"; // Assuming you have this service
import { CULectureDto, LecturerDto } from "../../types/testTypes";
import { toast } from "react-hot-toast";

const LectureEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the Lecture ID from URL params
  const navigate = useNavigate();
  const [Lecture, setLecture] = useState<CULectureDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [Lecturers, setLecturers] = useState<LecturerDto[]>([]);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const data = await getLectureByID(Number(id)); // Assuming this service fetches Lecture by ID
        setLecture(data);
      } catch (err) {
        toast.error("Failed to fetch Lecture details");
      } finally {
        setLoading(false);
      }
    };

    const fetchLecturers = async () => {
      try {
        const LecturerData: LecturerDto[] = await getLecturers();
        console.log("Fetched Lecturers:", LecturerData);
        setLecturers(LecturerData);
      } catch (err) {
        toast.error('Failed to fetch Lecturers');
      }
    };

    fetchLecture();
    fetchLecturers();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Lecture) return;

    try {
      await updateLecture(Number(id), Lecture); // Assuming this updates the Lecture
      toast.success("Lecture updated successfully");
      navigate("/dashboard/Lecture-list"); // Redirect after successful update
    } catch (err) {
      toast.error("Failed to update Lecture with error: ");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!Lecture) return <div className="text-center">Lecture not found</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-5xl bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Edit Lecture Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={Lecture.name}
                onChange={(e) => setLecture({ ...Lecture, name: e.target.value })}
                placeholder="Enter first name"
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            
          </div>
  
          
           
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="Lecturer" className="block text-sm font-medium text-gray-300 mb-1">
                Lecturer
              </label>
              <select
                name="LecturerId"
                id="LecturerId"
                value={Lecture.lecturerId|| ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setLecture({ ...Lecture, lecturerId: newValue ? Number(newValue) : 0 }); // Convert to number or set to 0 if empty
                  }}
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Lecturer</option>
                {Lecturers.map((dept) => (
                  <option key={dept.lecturerId} value={dept.lecturerId}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
  
          </div>
  
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Lecture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LectureEdit;
