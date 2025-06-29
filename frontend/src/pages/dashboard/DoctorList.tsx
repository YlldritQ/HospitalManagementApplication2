import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDoctors,
  deleteDoctor,
  assignRoomsToDoctor,
  removeRoomsFromDoctor,
} from '../../services/doctorService';
import { DoctorDto, DoctorRoomManagementDto } from '../../types/doctorTypes';
import { toast, Toaster } from 'react-hot-toast';
import { getDepartmentById } from '../../services/departmentService';
import RoomAssignmentModal from '../../components/modals/RoomAssignmentModal';
import { Stethoscope } from 'lucide-react';

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorDto[]>([]);
  const [departments, setDepartments] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);

        // Fetch unique departments
        const departmentIds = Array.from(
          new Set(data.map((doctor) => doctor.departmentId).filter((id) => id > 0))
        );
        const departmentPromises = departmentIds.map((id) => getDepartmentById(id));
        const departmentData = await Promise.all(departmentPromises);
        const departmentMap: Record<number, string> = {};
        departmentData.forEach((dept) => {
          if (dept) {
            departmentMap[dept.id] = dept.name;
          }
        });
        setDepartments(departmentMap);
      } catch (err) {
        setError('Failed to fetch doctors');
        toast.error('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteDoctor(id);
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
      toast.success('Doctor deleted successfully');
    } catch (err) {
      toast.error('Failed to delete doctor');
    }
  };

  const handleButtonClick = (id: number) => {
    navigate(`/dashboard/edit-doctor/${id}`);
  };

  const handleAssignRooms = async (dto: DoctorRoomManagementDto) => {
    try {
      await assignRoomsToDoctor(dto.doctorId, dto);
      toast.success('Rooms assigned successfully');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to assign rooms');
    }
  };

  const handleRemoveRooms = async (dto: DoctorRoomManagementDto) => {
    try {
      await removeRoomsFromDoctor(dto.doctorId, dto);
      toast.success('Rooms removed successfully');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to remove rooms');
    }
  };

  const handleAssignRoomsClick = (doctorId: number, departmentId: number) => {
    setSelectedDoctor(doctorId);
    setSelectedDepartment(departmentId);
    setIsModalOpen(true);
  };

  if (loading)
    return <div className="text-center text-gray-300">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen w-full p-6">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <Stethoscope className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Doctor List
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Manage doctors, specialties, and room assignments
        </p>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/10">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                ID
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Specialty
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Contact Info
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Department
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Available
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="hover:bg-white/10 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-gray-300">{doctor.id}</td>
                <td className="py-4 px-6 text-gray-300">
                  {doctor.firstName} {doctor.lastName}
                </td>
                <td className="py-4 px-6 text-gray-300">{doctor.specialty}</td>
                <td className="py-4 px-6 text-gray-300">{doctor.contactInfo}</td>
                <td className="py-4 px-6 text-gray-300">
                  {doctor.departmentId > 0
                    ? departments[doctor.departmentId]
                    : 'N/A'}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${doctor.isAvailable
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      }`}
                  >
                    {doctor.isAvailable ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleButtonClick(doctor.id)}
                      className="text-blue-400 hover:text-blue-300 underline transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="text-red-400 hover:text-red-300 underline transition duration-200"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleAssignRoomsClick(
                          doctor.id,
                          doctor.departmentId
                        )
                      }
                      className="text-green-400 hover:text-green-300 underline transition duration-200"
                    >
                      Manage Rooms
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-gray-400"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Toaster />

      {selectedDoctor !== null && selectedDepartment !== null && (
        <RoomAssignmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctorId={selectedDoctor}
          departmentId={selectedDepartment}
          onAssign={handleAssignRooms}
          onRemove={handleRemoveRooms}
        />
      )}
    </div>
  );
};

export default DoctorList;
