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

const AppointmentsPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const userId = loggedInUser?.id;
  const userRole = loggedInUser?.roles || [];

  const [appointments, setAppointments] = useState<AppointmentDto[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDto | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const [patients, setPatients] = useState<PatientDto[]>([]);
  const [doctors, setDoctors] = useState<DoctorDto[]>([]);
  const [rooms, setRooms] = useState<RoomDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allPatients, allDoctors, allRooms] = await Promise.all([
          getAllPatients(),
          getDoctors(),
          getAllRooms(),
        ]);
        setPatients(allPatients);
        setDoctors(allDoctors);
        setRooms(allRooms);
        await fetchAppointments();
      } catch (error) {
        toast.error("Failed to load initial data.");
        console.error(error);
      }
    };

    if (userId && userRole.length > 0) {
      fetchData();
    }
  }, [userId, userRole]);

  const fetchAppointments = async () => {
    try {
      if (userRole.includes("Admin")) {
        setAppointments(await getAppointments());
      } else if (userRole.includes("Doctor") || userRole.includes("Patient")) {
        setAppointments(await getAppointmentByUserId(userId!));
      }
    } catch (error) {
      toast.error("Error fetching appointments.");
    }
  };

  const findPatientName = (id: number) => {
    const patient = patients.find(p => p.patientId === id);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient";
  };

  const findDoctorName = (id: number) => {
    const doctor = doctors.find(d => d.id === id);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : "Unknown Doctor";
  };

  const findRoomNumber = (id: number) => {
    const room = rooms.find(r => r.id === id);
    return room ? room.roomNumber : "Unknown Room";
  };

  const handleCreateAppointment = async (appointment: CUAppointmentDto) => {
    const result = await createAppointment(appointment);
    result.isSucceed ? toast.success(result.message) : toast.error(result.message);
    setModalOpen(false);
    fetchAppointments();
  };

  const handleEditAppointment = async (appointment: CUAppointmentDto) => {
    if (selectedAppointment) {
      const result = await updateAppointment(selectedAppointment.id, appointment);
      result.isSucceed ? toast.success(result.message) : toast.error(result.message);
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

  const renderAppointmentsTable = () => (
    <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden shadow-lg">
      <thead>
        <tr className="bg-gray-900 text-white">
          {[
            "Appointment Date",
            "Patient",
            "Doctor",
            "Room",
            "Status",
            "Actions",
          ].map((header) => (
            <th key={header} className="py-4 px-6 text-left text-sm font-medium border-b border-gray-600">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.id} className="bg-gray-800 text-white">
            <td className="py-4 px-6">{new Date(appointment.appointmentDate).toLocaleString()}</td>
            <td className="py-4 px-6">{findPatientName(appointment.patientId)}</td>
            <td className="py-4 px-6">{findDoctorName(appointment.doctorId)}</td>
            <td className="py-4 px-6">{findRoomNumber(appointment.roomId)}</td>
            <td className="py-4 px-6">{appointment.status}</td>
            <td className="py-4 px-6 flex space-x-2">
              <button
                onClick={() => openEditModal(appointment)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteAppointment(appointment.id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderRoleView = (role: string) => (
    <div className="mb-8 w-full">
      <h2 className="text-2xl font-bold text-white mb-4">{role} View</h2>
      {role !== "Doctor" && (
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md"
          >
            Create Appointment
          </button>
        </div>
      )}
      {renderAppointmentsTable()}
    </div>
  );

  return (
    <div className="flex flex-col items-start justify-start p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-white mb-8">Appointments</h1>
      {userRole?.includes("Admin") && renderRoleView("Admin")}
      {userRole?.includes("Patient") && renderRoleView("Patient")}
      {userRole?.includes("Doctor") && renderRoleView("Doctor")}

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
