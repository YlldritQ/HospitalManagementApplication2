import React, { useState, useEffect } from "react";
import { getAllPatients, deletePatient } from "../../services/patientService";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";
import { User, Phone } from "lucide-react";
import PatientEmergencyContactsModal from "../../components/emergency-contacts/PatientEmergencyContactsModal";
import SearchFilter from "../../components/general/SearchFilter";

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
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const { user: loggedInUser } = useAuth();
  const roles = loggedInUser?.roles;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Modal state for emergency contacts
  const [isEmergencyContactsModalOpen, setIsEmergencyContactsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const fetchedPatients = await getAllPatients();
        const transformedPatients = transformPatientData(fetchedPatients);
        setPatients(transformedPatients);
        setFilteredPatients(transformedPatients);
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

  // Filter patients based on search term and filters
  useEffect(() => {
    let filtered = patients;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(patient =>
        patient.firstName.toLowerCase().includes(term) ||
        patient.lastName.toLowerCase().includes(term) ||
        patient.contactInfo.toLowerCase().includes(term) ||
        patient.patientId.toString().includes(term)
      );
    }

    // Gender filter
    if (genderFilter) {
      filtered = filtered.filter(patient => patient.gender === genderFilter);
    }

    setFilteredPatients(filtered);
  }, [patients, searchTerm, genderFilter]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'gender') {
      setGenderFilter(value);
    }
  };

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

  // Handle opening emergency contacts modal
  const handleViewEmergencyContacts = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEmergencyContactsModalOpen(true);
  };

  // Handle closing emergency contacts modal
  const handleCloseEmergencyContactsModal = () => {
    setIsEmergencyContactsModalOpen(false);
    setSelectedPatient(null);
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
  const isDoctor = roles?.includes("Doctor");

  // Get unique genders for filter
  const uniqueGenders = Array.from(new Set(patients.map(p => p.gender))).filter(Boolean);

  const filterOptions = [
    {
      type: 'gender',
      label: 'Gender',
      options: uniqueGenders.map(gender => ({ value: gender, label: gender })),
      value: genderFilter
    }
  ];

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

      {/* Search and Filter */}
      <div className="mb-6">
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          placeholder="Search patients by name, contact, or ID..."
          filters={filterOptions}
        />
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-400">
        Showing {filteredPatients.length} of {patients.length} patients
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
              {(isAdmin || isDoctor) && (
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredPatients.map((patient) => (
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
                {(isAdmin || isDoctor) && (
                  <td className="py-4 px-6">
                    <div className="flex gap-4">
                      {isDoctor && (
                        <button
                          onClick={() => handleViewEmergencyContacts(patient)}
                          className="text-emerald-400 hover:text-emerald-300 underline transition duration-200 flex items-center gap-1"
                        >
                          <Phone className="w-4 h-4" />
                          Emergency Contacts
                        </button>
                      )}
                      {isAdmin && (
                        <>
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
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Emergency Contacts Modal */}
      {isEmergencyContactsModalOpen && selectedPatient && (
        <PatientEmergencyContactsModal
          patientId={selectedPatient.userId}
          patientName={`${selectedPatient.firstName} ${selectedPatient.lastName}`}
          isOpen={isEmergencyContactsModalOpen}
          onClose={handleCloseEmergencyContactsModal}
        />
      )}
    </div>
  );
};

export default PatientList;
