import React, { useEffect, useState } from "react";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentByUserId,
  getAppointments,
  updateAppointment,
} from "../../services/appointmentService";
import { AppointmentDto, CUAppointmentDto } from "../../types/appointmentTypes";
import useAuth from "../../hooks/useAuth.hook";
import CreateAppointmentModal from "../../components/modals/CreateAppointmentModal";
import EditAppointmentModal from "../../components/modals/EditAppointmentModal";
import { DoctorDto } from "../../types/doctorTypes";
import { PatientDto } from "../../types/patientTypes";
import { RoomDto } from "../../types/roomTypes";
import { getDoctors } from "../../services/doctorService";
import { getAllRooms } from "../../services/roomService";
import { getAllPatients } from "../../services/patientService";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";

const AppointmentsPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const userId = loggedInUser?.id;
  const userRole = loggedInUser?.roles;
  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentDto | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [patients, setPatients] = useState<PatientDto[]>([]);
  const [doctors, setDoctors] = useState<DoctorDto[]>([]);
  const [rooms, setRooms] = useState<RoomDto[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const [allPatients, allDoctors, allRooms] = await Promise.all([
          getAllPatients(),
          getDoctors(),
          getAllRooms(),
        ]);
        setPatients(allPatients);
        setDoctors(allDoctors);
        setRooms(allRooms);
        if (userRole?.includes("Admin")) {
          const allAppointments = await getAppointments();
          setAppointments(allAppointments);
        } else if (
          userRole?.includes("Doctor") ||
          userRole?.includes("Patient")
        ) {
          const userAppointments = await getAppointmentByUserId(userId);
          setAppointments(userAppointments);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAppointments();
  }, [userId, userRole]);

  const fetchAppointments = async () => {
    if (userRole?.includes("Admin")) {
      const allAppointments = await getAppointments();
      setAppointments(allAppointments);
    } else if (userRole?.includes("Doctor") || userRole?.includes("Patient")) {
      const userAppointments = await getAppointmentByUserId(userId);
      setAppointments(userAppointments);
    }
  };

  const findPatientName = (patientId: number) => {
    const patient = patients.find((p) => p.patientId === patientId);
    return patient
      ? `${patient.firstName} ${patient.lastName}`
      : "Unknown Patient";
  };

  const findDoctorName = (doctorId: number) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  const findRoomNumber = (roomId: number) => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.roomNumber : "Unknown Room";
  };

  const handleCreateAppointment = async (appointment: CUAppointmentDto) => {
    const result = await createAppointment(appointment);
    result.isSucceed
      ? toast.success(result.message)
      : toast.error(result.message);
    setModalOpen(false);
    fetchAppointments();
  };

  const handleEditAppointment = async (appointment: CUAppointmentDto) => {
    if (selectedAppointment) {
      const result = await updateAppointment(selectedAppointment.id, appointment);
      result.isSucceed
        ? toast.success(result.message)
        : toast.error(result.message);
      setModalOpen(false);
      fetchAppointments();
    }
  };

  const handleDeleteAppointment = async (id: number) => {
    await deleteAppointment(id);
    fetchAppointments();
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedAppointment(null);
    setModalOpen(true);
  };

  const openEditModal = (appointment: AppointmentDto) => {
    setModalMode("edit");
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const renderTable = () => (
    <div className="w-full overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/10">
          <tr>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
              Appointment Date
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
              Patient
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
              Doctor
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
              Room
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
              Status
            </th>
            <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="hover:bg-white/10 transition-colors duration-200"
            >
              <td className="py-4 px-6 text-gray-300">
                {new Date(appointment.appointmentDate).toLocaleString()}
              </td>
              <td className="py-4 px-6 text-gray-300">
                {findPatientName(appointment.patientId)}
              </td>
              <td className="py-4 px-6 text-gray-300">
                {findDoctorName(appointment.doctorId)}
              </td>
              <td className="py-4 px-6 text-gray-300">
                {findRoomNumber(appointment.roomId)}
              </td>
              <td className="py-4 px-6 text-gray-300">
                {appointment.status}
              </td>
              <td className="py-4 px-6 flex space-x-2">
                <button
                  onClick={() => openEditModal(appointment)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAppointment(appointment.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-8 text-center text-gray-400"
              >
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen w-full p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <Calendar className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">Appointments</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Manage all medical appointments in one place
        </p>
      </div>

      {(userRole?.includes("Admin") ||
        userRole?.includes("Patient")) && (
          <div className="mb-8 w-full">
            <div className="mb-6">
              <button
                onClick={openCreateModal}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Appointment
              </button>
            </div>

            {renderTable()}
          </div>
        )}

      {userRole?.includes("Doctor") && (
        <div className="mb-8 w-full">
          {renderTable()}
        </div>
      )}

      {modalMode === "create" ? (
        <CreateAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateAppointment}
        />
      ) : (
        <EditAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleEditAppointment}
          appointment={selectedAppointment!}
        />
      )}
    </div>
  );
};

export default AppointmentsPage;
