import React, { useState, useEffect } from "react";
import { getAllPatients, deletePatient } from "../../services/patientService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";
import { User } from "lucide-react";

interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  contactInfo: string;
  userId: string;
}

const transformPatientData = (data: any): Patient[] => {
  const patientArray = Array.isArray(data) ? data : data.patients || [];
  return patientArray.map((item: any) => ({
    patientId: item.patientId,
    firstName: item.firstName,
    lastName: item.lastName,
    dateOfBirth: new Date(item.dateOfBirth),
    gender: item.gender,
    contactInfo: item.contactInfo,
    userId: item.userId,
  }));
};

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const { user: loggedInUser } = useAuth();
  const roles = loggedInUser?.roles;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const fetchedPatients = await getAllPatients();
        const transformedPatients = transformPatientData(fetchedPatients);
        setPatients(transformedPatients);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (patientId: number) => {
    try {
      await deletePatient(patientId);
      setPatients((prev) =>
        prev.filter((patient) => patient.patientId !== patientId)
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleEdit = (patientId: number) => {
    navigate(`/dashboard/edit-patient/${patientId}`);
  };

  if (loading) {
    return (
      <div className="text-gray-300 text-center p-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-10">Error: {error}</div>
    );
  }

  const isAdmin = roles?.includes("Admin");

  return (
    <div className="min-h-screen w-full p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-emerald-600/20 rounded-2xl backdrop-blur-sm border border-emerald-500/20">
            <User className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Patient List
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Manage patient information and records
        </p>
      </div>

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
                Gender
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Contact Info
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                Date of Birth
              </th>
              {isAdmin && (
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {patients.map((patient) => (
              <tr
                key={patient.patientId}
                className="hover:bg-white/10 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-gray-300">
                  {patient.patientId}
                </td>
                <td className="py-4 px-6 text-gray-300">
                  {`${patient.firstName} ${patient.lastName}`}
                </td>
                <td className="py-4 px-6 text-gray-300">{patient.gender}</td>
                <td className="py-4 px-6 text-gray-300">
                  {patient.contactInfo}
                </td>
                <td className="py-4 px-6 text-gray-300">
                  {patient.dateOfBirth.toDateString()}
                </td>
                {isAdmin && (
                  <td className="py-4 px-6">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(patient.patientId)}
                        className="text-blue-400 hover:text-blue-300 underline transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(patient.patientId)}
                        className="text-red-400 hover:text-red-300 underline transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 5}
                  className="text-center py-8 text-gray-400"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
