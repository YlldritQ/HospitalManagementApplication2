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
import SearchFilter from '../../components/general/SearchFilter';

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorDto[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorDto[]>([]);
  const [departments, setDepartments] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
        setFilteredDoctors(data);

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

  // Filter doctors based on search term and filters
  useEffect(() => {
    let filtered = doctors;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(doctor =>
        doctor.firstName.toLowerCase().includes(term) ||
        doctor.lastName.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term) ||
        doctor.contactInfo.toLowerCase().includes(term) ||
        doctor.id.toString().includes(term)
      );
    }

    // Specialty filter
    if (specialtyFilter) {
      filtered = filtered.filter(doctor => doctor.specialty === specialtyFilter);
    }

    // Department filter
    if (departmentFilter) {
      const deptId = parseInt(departmentFilter);
      filtered = filtered.filter(doctor => doctor.departmentId === deptId);
    }

    // Availability filter
    if (availabilityFilter) {
      const isAvailable = availabilityFilter === 'true';
      filtered = filtered.filter(doctor => doctor.isAvailable === isAvailable);
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, specialtyFilter, departmentFilter, availabilityFilter]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'specialty') {
      setSpecialtyFilter(value);
    } else if (filterType === 'department') {
      setDepartmentFilter(value);
    } else if (filterType === 'availability') {
      setAvailabilityFilter(value);
    }
  };

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

  // Get unique specialties and departments for filters
  const uniqueSpecialties = Array.from(new Set(doctors.map(d => d.specialty))).filter(Boolean);
  const uniqueDepartments = Object.entries(departments).map(([id, name]) => ({
    value: id,
    label: name
  }));

  const filterOptions = [
    {
      type: 'specialty',
      label: 'Specialty',
      options: uniqueSpecialties.map(specialty => ({ value: specialty, label: specialty })),
      value: specialtyFilter
    },
    {
      type: 'department',
      label: 'Department',
      options: uniqueDepartments,
      value: departmentFilter
    },
    {
      type: 'availability',
      label: 'Availability',
      options: [
        { value: 'true', label: 'Available' },
        { value: 'false', label: 'Not Available' }
      ],
      value: availabilityFilter
    }
  ];

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

      {/* Search and Filter */}
      <div className="mb-6">
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          placeholder="Search doctors by name, specialty, contact, or ID..."
          filters={filterOptions}
        />
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-400">
        Showing {filteredDoctors.length} of {doctors.length} doctors
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
            {filteredDoctors.map((doctor) => (
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
          </tbody>
        </table>
      </div>

      {/* Room Assignment Modal */}
      {isModalOpen && selectedDoctor && selectedDepartment && (
        <RoomAssignmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctorId={selectedDoctor}
          departmentId={selectedDepartment}
          onAssign={handleAssignRooms}
          onRemove={handleRemoveRooms}
        />
      )}

      <Toaster />
    </div>
  );
};

export default DoctorList;
