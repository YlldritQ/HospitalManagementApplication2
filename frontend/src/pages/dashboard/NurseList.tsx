import React, { useEffect, useState } from "react";
import {
  getAllNurses,
  deleteNurse,
  assignRoomsToNurse,
  removeRoomsFromNurse,
} from "../../services/nurseService";
import { NurseDto, NurseRoomAssignmentDto } from "../../types/nurseTypes";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { getDepartmentById } from "../../services/departmentService";
import NurseRoomAssignmentModal from "../../components/modals/NurseRoomAssignmentModal";
import { UserCheck } from "lucide-react";

const NurseList: React.FC = () => {
  const [nurses, setNurses] = useState<NurseDto[]>([]);
  const [departments, setDepartments] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNurseId, setSelectedNurseId] = useState<number | null>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const data = await getAllNurses();
        setNurses(data);

        const departmentIds = Array.from(
          new Set(data.map(nurse => nurse.departmentId).filter(id => id > 0))
        );
        const departmentPromises = departmentIds.map(id =>
          getDepartmentById(id)
        );
        const departmentData = await Promise.all(departmentPromises);
        const departmentMap: Record<number, string> = {};
        departmentData.forEach(department => {
          if (department) {
            departmentMap[department.id] = department.name;
          }
        });
        setDepartments(departmentMap);
      } catch (err) {
        setError("Failed to fetch nurses");
        toast.error("Failed to fetch nurses");
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteNurse(id);
      setNurses(nurses.filter(nurse => nurse.id !== id));
      toast.success("Nurse deleted successfully");
    } catch (err) {
      toast.error("Failed to delete nurse");
    }
  };

  const handleButtonClick = (id: number) => {
    navigate(`/dashboard/edit-nurse/${id}`);
  };

  const openRoomAssignmentModal = (nurseId: number, departmentId: number) => {
    setSelectedNurseId(nurseId);
    setSelectedDepartmentId(departmentId);
    setModalOpen(true);
  };

  const handleAssign = async (dto: NurseRoomAssignmentDto) => {
    try {
      await assignRoomsToNurse(dto.nurseId, dto);
      toast.success("Rooms assigned successfully");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to assign rooms");
    }
  };

  const handleRemove = async (dto: NurseRoomAssignmentDto) => {
    try {
      await removeRoomsFromNurse(dto.nurseId, dto);
      toast.success("Rooms removed successfully");
      setModalOpen(false);
    } catch (err) {
      toast.error("Failed to remove rooms");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <UserCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">Nurse List</h1>
        </div>

        <div className="w-full overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">ID</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Name</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Contact Info</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Department</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Available</th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {nurses.map(nurse => (
                <tr
                  key={nurse.id}
                  className="hover:bg-white/10 transition-colors duration-200"
                >
                  <td className="py-4 px-6 text-gray-300">{nurse.id}</td>
                  <td className="py-4 px-6 text-gray-300">
                    {`${nurse.firstName} ${nurse.lastName}`}
                  </td>
                  <td className="py-4 px-6 text-gray-300">{nurse.contactInfo}</td>
                  <td className="py-4 px-6 text-gray-300">
                    {nurse.departmentId > 0
                      ? departments[nurse.departmentId]
                      : "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${nurse.isAvailable
                          ? "bg-emerald-500 text-white"
                          : "bg-red-500 text-white"
                        }`}
                    >
                      {nurse.isAvailable ? "Available" : "Not Available"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    <button
                      onClick={() => handleButtonClick(nurse.id)}
                      className="text-blue-400 hover:underline mr-4 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(nurse.id)}
                      className="text-red-400 hover:underline mr-4 transition duration-200"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        openRoomAssignmentModal(nurse.id, nurse.departmentId)
                      }
                      className="text-green-400 hover:underline transition duration-200"
                    >
                      Manage Rooms
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {nurses.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No nurses found.
            </div>
          )}
        </div>
      </div>

      <Toaster position="top-right" />

      {selectedNurseId !== null && selectedDepartmentId !== null && (
        <NurseRoomAssignmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          nurseId={selectedNurseId}
          departmentId={selectedDepartmentId}
          onAssign={handleAssign}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default NurseList;
