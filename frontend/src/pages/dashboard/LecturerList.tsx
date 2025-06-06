import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { getLecturers, deleteLecturer } from "../../services/testServices";
import { LecturerDto } from "../../types/testTypes";
import LecturerModal from "../../components/modals/LecturerModal";

const LecturerList: React.FC = () => {
  const [Lecturers, setLecturers] = useState<LecturerDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLecturer, setSelectedLecturer] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchLecturers = async () => {
          try {
              const data = await getLecturers();
              console.log(data);
              setLecturers(data);
            } catch (err) {
                setError("Failed to fetch Lecturers");
                toast.error("Failed to fetch Lecturers");
            } finally {
                setLoading(false);
            }
        };

    fetchLecturers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteLecturer(id);
      setLecturers(Lecturers.filter((Lecturer) => Lecturer.lecturerId !== id));
      toast.success("Lecturer deleted successfully");
    } catch (err) {
      toast.error("Failed to delete Lecturer");
    }
  };

  const handleButtonClick = (id: number) => {
    navigate(`/dashboard/edit-Lecturer/${id}`);
  };

  const handleAddLecturerClick = () => {
    setSelectedLecturer(null);
    setIsModalOpen(true);
  };


  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">Lecturer List</h1>
      <div className="w-full max-w-6xl mb-6">
        <button
          onClick={handleAddLecturerClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Lecturer
        </button>
      </div>
      <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">
              ID
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">
              Name
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">
              Type
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">
              isDeleted
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Lecturers.map((Lecturer) => (
            <tr
              key={Lecturer.lecturerId}
              className="hover:bg-gray-600 transition duration-200 border-b border-gray-600"
            >
              <td className="py-4 px-6 text-sm text-gray-300">
                {Lecturer.lecturerId}
              </td>
              <td className="py-4 px-6 text-sm text-gray-300">
                {Lecturer.name}
              </td>
              <td className="py-4 px-6 text-sm text-gray-300">
                {Lecturer.department}
              </td>
              <td className="py-4 px-6 text-sm text-gray-300">
                {Lecturer.email }
              </td>
              <td className="py-4 px-6 text-sm flex space-x-4">
                <button
                  onClick={() => handleButtonClick(Lecturer.lecturerId)}
                  className="text-blue-400 hover:text-blue-500 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(Lecturer.lecturerId)}
                  className="text-red-400 hover:text-red-500 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
      <LecturerModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        LecturerId={selectedLecturer ?? 0}
      />
    </div>
  );
};

export default LecturerList;
