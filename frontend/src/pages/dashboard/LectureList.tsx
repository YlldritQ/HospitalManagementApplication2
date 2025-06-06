import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import {
  getLectures,
  deleteLecture,
  createLecture,
  getLecturers,
} from "../../services/testServices";
import { CULectureDto, LectureDto, LecturerDto } from "../../types/testTypes";
import LectureCreateModal from "../../components/modals/LectureCreateModal";

const LectureList: React.FC = () => {
  const navigate = useNavigate();
  
  const [Lectures, setLectures] = useState<LectureDto[]>([]);
  const [Lecturers, setLecturers] = useState<LecturerDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State for modal visibility

  useEffect(() => {
    const fetchLectures = async () => {
      
      try {
        const LectureData: LectureDto[] = await getLectures();
        console.log(LectureData); 
        setLectures(LectureData);
      } catch (err) {
        toast.error('Failed to fetch Lectures');
        setError('Failed to fetch Lectures');
      } finally {
        setLoading(false);
      }
    };

    const fetchLecturers = async () => {
      try {
        const LecturerData: LecturerDto[] = await getLecturers();
        setLecturers(LecturerData);
      } catch (err) {
        toast.error('Failed to fetch Lecturers');
      }
    };

    fetchLectures();
    fetchLecturers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteLecture(id);
      setLectures(Lectures.filter((Lecture) => Lecture.lectureId !== id)); // Update the Lectures state
      toast.success("Lecture deleted successfully");
    } catch (err) {
      toast.error("Failed to delete Lecture");
    }
  };

  const handleButtonClick = (id: number) => {
    navigate(`/dashboard/edit-Lecture/${id}`);
  };

  const handleCreate = async (LectureDto: CULectureDto) => {
    try {
      await createLecture(LectureDto);
      toast.success("Lecture created successfully");
      setModalOpen(false);
      // Optionally, fetch Lectures again to update the list
      const LectureData: LectureDto[] = await getLectures();
      setLectures(LectureData);
    } catch (err) {
      toast.error("Failed to create Lecture");
    }

  };
  const findLecturerName = (LecturerId: number) => {
    const Lecturer = Lecturers.find((p) => p.lecturerId === LecturerId);
    return Lecturer ? `${Lecturer.name}` : "Unknown department";
  };
  
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-start justify-start p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-white mb-8">Lecture List</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add New Lecture
      </button>
      <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">ID</th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">Name</th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">Number</th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">Birth Year</th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">Lecturer</th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
  {Lectures.map((Lecture) => (
    <tr key={Lecture.lectureId} className="border-b border-gray-700">
      <td className="py-4 px-6 text-white">{Lecture.lectureId}</td>
      <td className="py-4 px-6 text-white">{Lecture.name}</td> {/* Use Lecture.Name */}
      <td className="py-4 px-6 text-white">{findLecturerName(Lecture.lecturerId) }</td> {/* Use Lecture.BirthYear */}
      <td className="py-4 px-6">
        <button
          onClick={() => handleButtonClick(Lecture.lectureId)}
          className="text-blue-400 hover:underline mr-4 transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(Lecture.lectureId)}
          className="text-red-400 hover:underline mr-4 transition duration-200"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>


      </table>
      <Toaster />
      {modalOpen && (
        <LectureCreateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}  // Ensure handleCreate is defined and passed correctly
      />
      )}
    </div>
  );
};

export default LectureList;
