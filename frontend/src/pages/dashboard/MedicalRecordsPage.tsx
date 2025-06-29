import React, { useEffect, useState } from "react";
import {
  CUMedicalRecordDto,
  MedicalRecordDto,
} from "../../types/medicalRecordTypes";
import medicalRecordService from "../../services/medicalRecordService";
import {
  getAllPatients,
  getPatientByUserId,
} from "../../services/patientService";
import { getDoctors } from "../../services/doctorService";
import { getAllNurses } from "../../services/nurseService";
import { DoctorDto } from "../../types/doctorTypes";
import { PatientDto } from "../../types/patientTypes";
import { NurseDto } from "../../types/nurseTypes";
import { getAllPrescriptions } from "../../services/prescriptionService";
import { PrescriptionDto } from "../../types/prescriptionTypes";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NewMedicalRecordModal from "../../components/modals/NewMedicalRecordModal";
import useAuth from "../../hooks/useAuth.hook";
import {
  FileText,
  Download,
  Plus,
  Edit3,
  Trash2,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  Stethoscope,
  UserCheck,
  Pill,
  Search,
  X,
  Check
} from "lucide-react";

const MedicalRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecordDto[]>([]);
  const [patients, setPatients] = useState<PatientDto[]>([]);
  const [patient, setPatient] = useState<PatientDto | null>();
  const [doctors, setDoctors] = useState<DoctorDto[]>([]);
  const [nurses, setNurses] = useState<NurseDto[]>([]);
  const { user: loggedInUser } = useAuth();
  const roles = loggedInUser?.roles;
  const userId = loggedInUser?.id;
  const [isModalOpen, setModalOpen] = useState(false);
  const [prescriptions, setPrescriptions] = useState<PrescriptionDto[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [editingRecord, setEditingRecord] = useState<MedicalRecordDto | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof MedicalRecordDto>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch medical records based on the user's role
        let fetchedRecords;
        if (
          roles?.includes("Admin") ||
          roles?.includes("Doctor") ||
          roles?.includes("Nurse")
        ) {
          fetchedRecords = await medicalRecordService.getAllMedicalRecords();
        } else {
          fetchedRecords = await medicalRecordService.getMedicalRecordsByUserId(
            userId
          );
        }
        setRecords(fetchedRecords);

        // Fetch patients
        const fetchedPatients = await getAllPatients();
        setPatients(fetchedPatients);

        // Fetch doctors
        const fetchedDoctors = await getDoctors();
        setDoctors(fetchedDoctors);

        // Fetch nurses
        const fetchedNurses = await getAllNurses();
        setNurses(fetchedNurses);

        // Fetch prescriptions
        const allPrescriptions = await getAllPrescriptions();
        setPrescriptions(allPrescriptions);

        // Fetch patient for non-admin roles
        if (roles?.includes("Patient")) {
          const patient = await getPatientByUserId(userId);
          setPatient(patient);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [roles, userId]);

  const handleCreate = async (recordDto: CUMedicalRecordDto) => {
    try {
      console.log(recordDto);
      const newRecord = await medicalRecordService.createMedicalRecord(
        recordDto
      );
      setRecords([...records, newRecord]);
      setModalOpen(false);
    } catch (err) {
      setError("Failed to create new medical record.");
    }
  };

  const handleUpdate = async () => {
    if (editingRecord) {
      try {
        await medicalRecordService.updateMedicalRecord(
          editingRecord.id,
          editingRecord
        );
        setRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.id === editingRecord.id ? editingRecord : record
          )
        );
        setEditingRecord(null);
        setShowEditForm(false);
      } catch (error) {
        setError("Failed to update record.");
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await medicalRecordService.deleteMedicalRecord(id);
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.id !== id)
      );
    } catch (error) {
      setError("Failed to delete record.");
    }
  };

  const handleSort = (column: keyof MedicalRecordDto) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);

    setRecords(
      records.slice().sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (aValue === undefined || aValue === null)
          return direction === "asc" ? 1 : -1;
        if (bValue === undefined || bValue === null)
          return direction === "asc" ? -1 : 1;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);

        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
          return direction === "asc"
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        }

        return 0;
      })
    );
  };

  const generatePDF = () => {
    if (selectedPatientId === null) {
      setError("Please select a patient.");
      return;
    }

    const patientRecords = records.filter(
      (record) => record.patientId === selectedPatientId
    );
    const patient = patients.find((p) => p.patientId === selectedPatientId);

    if (!patient) {
      setError("Selected patient not found.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Medical Records for ${patient.firstName} ${patient.lastName}`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    doc.setLineWidth(0.5);
    doc.line(15, 25, doc.internal.pageSize.getWidth() - 15, 25);

    doc.setFontSize(14);
    doc.text(`Patient Details:`, 14, 35);
    doc.setFontSize(12);
    doc.text(`ID: ${patient.patientId}`, 16, 42);
    doc.text(`Name: ${patient.firstName} ${patient.lastName}`, 16, 48);
    doc.text(
      `Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}`,
      16,
      54
    );
    doc.text(`Gender: ${patient.gender || "Unknown"}`, 16, 60);
    doc.text(`Contact: ${patient.contactInfo || "N/A"}`, 16, 66);

    doc.setLineWidth(0.5);
    doc.line(15, 72, doc.internal.pageSize.getWidth() - 15, 72);
    doc.setFont("helvetica", "bold");
    doc.text(`Medical Records:`, 14, 80);
    doc.setFont("helvetica", "normal");

    let yPosition = 90;

    patientRecords.forEach((record, index) => {
      const doctor = doctors.find((d) => d.id === record.doctorId);
      const nurse = nurses.find((n) => n.id === record.nurseId);
      const recordPrescriptions =
        record.prescriptionId !== undefined
          ? prescriptions.find((p) => p.id === record.prescriptionId)
            ? `${prescriptions.find((p) => p.id === record.prescriptionId)
              ?.medicationName
            } (${prescriptions.find((p) => p.id === record.prescriptionId)
              ?.dosage
            })`
            : "N/A"
          : "N/A";

      doc.setFont("helvetica", "bold");
      doc.text(`Record ${index + 1}:`, 14, yPosition);
      yPosition += 8;

      doc.setFont("helvetica", "normal");
      doc.text(
        `Date: ${new Date(record.recordDate).toLocaleString()}`,
        16,
        yPosition
      );
      yPosition += 6;
      doc.text(`Details: ${record.recordDetails}`, 16, yPosition);
      yPosition += 6;
      doc.text(
        `Doctor: ${doctor
          ? `${doctor.firstName} ${doctor.lastName} (Specialty: ${doctor.specialty})`
          : "N/A"
        }`,
        16,
        yPosition
      );
      yPosition += 6;
      doc.text(
        `Nurse: ${nurse ? `${nurse.firstName} ${nurse.lastName}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 6;
      doc.text(`Prescriptions: ${recordPrescriptions || "N/A"}`, 16, yPosition);
      yPosition += 10;

      doc.setLineWidth(0.1);
      doc.line(
        15,
        yPosition - 2,
        doc.internal.pageSize.getWidth() - 15,
        yPosition - 2
      );
      yPosition += 6;
    });

    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save(
      `medical-records-${patient.firstName}-${patient.lastName
      }-${new Date().getTime()}.pdf`
    );
  };

  const generatePrescriptionPDF = () => {
    if (selectedPatientId === null) {
      setError("Please select a patient.");
      return;
    }

    const patientRecords = records.filter(
      (record) => record.patientId === selectedPatientId
    );
    const patient = patients.find((p) => p.patientId === selectedPatientId);

    if (!patient) {
      setError("Selected patient not found.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Prescription Details for ${patient.firstName} ${patient.lastName}`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    doc.setLineWidth(0.5);
    doc.line(15, 25, doc.internal.pageSize.getWidth() - 15, 25);

    doc.setFontSize(14);
    doc.text(`Patient Details:`, 14, 35);
    doc.setFontSize(12);
    doc.text(`Name: ${patient.firstName} ${patient.lastName}`, 16, 48);
    doc.text(
      `Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}`,
      16,
      54
    );

    doc.setLineWidth(0.5);
    doc.line(15, 60, doc.internal.pageSize.getWidth() - 15, 60);
    doc.setFont("helvetica", "bold");
    doc.text(`Prescription Records:`, 14, 70);
    doc.setFont("helvetica", "normal");

    let yPosition = 80;

    patientRecords.forEach((record) => {
      const doctor = doctors.find((d) => d.id === record.doctorId);
      const prescription = prescriptions.find(
        (p) => p.id === record.prescriptionId
      );

      doc.setFont("helvetica", "normal");
      doc.text(
        `Doctor: ${doctor ? `${doctor.firstName} ${doctor.lastName}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Prescription: ${prescription ? `${prescription.medicationName}` : "N/A"
        }`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Dosage: ${prescription ? `${prescription.dosage}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Instructions: ${prescription ? `${prescription.instructions}` : "N/A"
        }`,
        16,
        yPosition
      );
      yPosition += 10;

      doc.text(
        `Date Issued: ${prescription ? `${prescription.dateIssued}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.setLineWidth(0.1);
      doc.line(
        15,
        yPosition - 2,
        doc.internal.pageSize.getWidth() - 15,
        yPosition - 2
      );
      yPosition += 6;
    });

    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save(
      `prescription-records-${patient.firstName}-${patient.lastName
      }-${new Date().getTime()}.pdf`
    );
  };

  const generateMyPrescriptionPDF = () => {
    if (!patient) {
      setError("Selected patient not found.");
      return;
    }

    const patientRecords = records.filter(
      (record) => record.patientId === patient?.patientId
    );

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Prescription Details for ${patient.firstName} ${patient.lastName}`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    doc.setLineWidth(0.5);
    doc.line(15, 25, doc.internal.pageSize.getWidth() - 15, 25);

    doc.setFontSize(14);
    doc.text(`Patient Details:`, 14, 35);
    doc.setFontSize(12);
    doc.text(`Name: ${patient.firstName} ${patient.lastName}`, 16, 48);
    doc.text(
      `Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}`,
      16,
      54
    );

    doc.setLineWidth(0.5);
    doc.line(15, 60, doc.internal.pageSize.getWidth() - 15, 60);
    doc.setFont("helvetica", "bold");
    doc.text(`Prescription Records:`, 14, 70);
    doc.setFont("helvetica", "normal");

    let yPosition = 80;

    patientRecords.forEach((record) => {
      const doctor = doctors.find((d) => d.id === record.doctorId);
      const prescription = prescriptions.find(
        (p) => p.id === record.prescriptionId
      );

      doc.setFont("helvetica", "normal");
      doc.text(
        `Doctor: ${doctor ? `${doctor.firstName} ${doctor.lastName}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Prescription: ${prescription ? `${prescription.medicationName}` : "N/A"
        }`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Dosage: ${prescription ? `${prescription.dosage}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.text(
        `Instructions: ${prescription ? `${prescription.instructions}` : "N/A"
        }`,
        16,
        yPosition
      );
      yPosition += 10;

      doc.text(
        `Date Issued: ${prescription ? `${prescription.dateIssued}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 10;
      doc.setLineWidth(0.1);
      doc.line(
        15,
        yPosition - 2,
        doc.internal.pageSize.getWidth() - 15,
        yPosition - 2
      );
      yPosition += 6;
    });

    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save(
      `prescription-records-${patient.firstName}-${patient.lastName
      }-${new Date().getTime()}.pdf`
    );
  };

  const generateMyRecordsPDF = () => {
    if (!patient) {
      setError("Selected patient not found.");
      return;
    }

    const patientRecords = records.filter(
      (record) => record.patientId === patient?.patientId
    );

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Medical Records for ${patient.firstName} ${patient.lastName}`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    doc.setLineWidth(0.5);
    doc.line(15, 25, doc.internal.pageSize.getWidth() - 15, 25);

    doc.setFontSize(14);
    doc.text(`Patient Details:`, 14, 35);
    doc.setFontSize(12);
    doc.text(`ID: ${patient.patientId}`, 16, 42);
    doc.text(`Name: ${patient.firstName} ${patient.lastName}`, 16, 48);
    doc.text(
      `Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}`,
      16,
      54
    );
    doc.text(`Gender: ${patient.gender || "Unknown"}`, 16, 60);
    doc.text(`Contact: ${patient.contactInfo || "N/A"}`, 16, 66);

    doc.setLineWidth(0.5);
    doc.line(15, 72, doc.internal.pageSize.getWidth() - 15, 72);
    doc.setFont("helvetica", "bold");
    doc.text(`Medical Records:`, 14, 80);
    doc.setFont("helvetica", "normal");

    let yPosition = 90;

    patientRecords.forEach((record, index) => {
      const doctor = doctors.find((d) => d.id === record.doctorId);
      const nurse = nurses.find((n) => n.id === record.nurseId);
      const recordPrescriptions =
        record.prescriptionId !== undefined
          ? prescriptions.find((p) => p.id === record.prescriptionId)
            ? `${prescriptions.find((p) => p.id === record.prescriptionId)
              ?.medicationName
            } (${prescriptions.find((p) => p.id === record.prescriptionId)
              ?.dosage
            })`
            : "N/A"
          : "N/A";

      doc.setFont("helvetica", "bold");
      doc.text(`Record ${index + 1}:`, 14, yPosition);
      yPosition += 8;

      doc.setFont("helvetica", "normal");
      doc.text(
        `Date: ${new Date(record.recordDate).toLocaleString()}`,
        16,
        yPosition
      );
      yPosition += 6;
      doc.text(`Details: ${record.recordDetails}`, 16, yPosition);
      yPosition += 6;
      doc.text(
        `Doctor: ${doctor
          ? `${doctor.firstName} ${doctor.lastName} (Specialty: ${doctor.specialty})`
          : "N/A"
        }`,
        16,
        yPosition
      );
      yPosition += 6;
      doc.text(
        `Nurse: ${nurse ? `${nurse.firstName} ${nurse.lastName}` : "N/A"}`,
        16,
        yPosition
      );
      yPosition += 6;
      doc.text(`Prescriptions: ${recordPrescriptions || "N/A"}`, 16, yPosition);
      yPosition += 10;

      doc.setLineWidth(0.1);
      doc.line(
        15,
        yPosition - 2,
        doc.internal.pageSize.getWidth() - 15,
        yPosition - 2
      );
      yPosition += 6;
    });

    doc.setFontSize(10);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save(
      `medical-records-${patient.firstName}-${patient.lastName
      }-${new Date().getTime()}.pdf`
    );
  };

  const filteredRecords = records.filter((record) =>
    record.recordDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patients.find(p => p.patientId === record.patientId)?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patients.find(p => p.patientId === record.patientId)?.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SortButton = ({ column, children }: { column: keyof MedicalRecordDto; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200 group"
    >
      {children}
      <div className="flex flex-col">
        <ChevronUp
          className={`w-3 h-3 ${sortColumn === column && sortDirection === "asc" ? "text-blue-400" : "text-gray-500"} group-hover:text-blue-400 transition-colors`}
        />
        <ChevronDown
          className={`w-3 h-3 -mt-1 ${sortColumn === column && sortDirection === "desc" ? "text-blue-400" : "text-gray-500"} group-hover:text-blue-400 transition-colors`}
        />
      </div>
    </button>
  );

  const ActionButton = ({ onClick, variant, children, icon: Icon }: {
    onClick: () => void;
    variant: 'primary' | 'secondary' | 'success' | 'danger';
    children: React.ReactNode;
    icon?: any;
  }) => {
    const variants = {
      primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
      secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white",
      success: "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white",
      danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
    };

    return (
      <button
        onClick={onClick}
        className={`${variants[variant]} px-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-fit`}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/20">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-white">
              Medical Records
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Comprehensive patient care management system</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-red-500/20 rounded-full">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-red-400 font-medium">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Controls Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 mb-8 shadow-2xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Create Button */}
            {(roles?.includes("Admin") || roles?.includes("Doctor") || roles?.includes("Patient")) && (
              <ActionButton
                onClick={() => setModalOpen(true)}
                variant="primary"
                icon={Plus}
              >
                Create New Record
              </ActionButton>
            )}

            {/* PDF Buttons */}
            <ActionButton
              onClick={roles?.includes("Patient") ? generateMyRecordsPDF : generatePDF}
              variant="success"
              icon={Download}
            >
              Download Records
            </ActionButton>

            <ActionButton
              onClick={roles?.includes("Patient") ? generateMyPrescriptionPDF : generatePrescriptionPDF}
              variant="success"
              icon={Pill}
            >
              Download Prescriptions
            </ActionButton>

            {/* Patient Selector (not for Patient role) */}
            {!roles?.includes("Patient") && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Patient
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-left text-gray-300 hover:bg-white/15 transition-all duration-200 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      {selectedPatientId
                        ? patients.find(p => p.patientId === selectedPatientId)?.firstName + " " +
                        patients.find(p => p.patientId === selectedPatientId)?.lastName
                        : "Select a patient"
                      }
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        <button
                          className="w-full text-left px-3 py-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedPatientId(null);
                            setIsDropdownOpen(false);
                          }}
                        >
                          Select a patient
                        </button>
                        {patients.map((patient) => (
                          <button
                            key={patient.patientId}
                            className="w-full text-left px-3 py-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                            onClick={() => {
                              setSelectedPatientId(patient.patientId);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <User className="w-4 h-4 text-gray-400" />
                            {patient.firstName} {patient.lastName}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search records by details or patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-10 pr-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              Medical Records
            </h2>
            <p className="text-gray-400 mt-1">
              Showing {filteredRecords.length} of {records.length} records
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    <SortButton column="id">
                      <span className="text-sm font-semibold text-gray-300">ID</span>
                    </SortButton>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    <SortButton column="patientId">
                      <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Patient
                      </span>
                    </SortButton>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    <SortButton column="recordDate">
                      <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </span>
                    </SortButton>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    <SortButton column="recordDetails">
                      <span className="text-sm font-semibold text-gray-300">Details</span>
                    </SortButton>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      Doctor
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      Nurse
                    </span>
                  </th>
                  <th className="px-6 py-4 text-left border-b border-white/10">
                    <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Prescription
                    </span>
                  </th>
                  {(roles?.includes("Admin") || roles?.includes("Doctor")) && (
                    <th className="px-6 py-4 text-left border-b border-white/10">
                      <span className="text-sm font-semibold text-gray-300">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRecords.map((record, index) => {
                  const patient = patients.find(p => p.patientId === record.patientId);
                  const doctor = doctors.find(d => d.id === record.doctorId);
                  const nurse = nurses.find(n => n.id === record.nurseId);
                  const prescription = prescriptions.find(p => p.id === record.prescriptionId);

                  return (
                    <tr
                      key={record.id}
                      className={`hover:bg-white/5 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white/2' : ''
                        }`}
                    >
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium">
                          {record.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {patient?.firstName?.[0]}{patient?.lastName?.[0]}
                            </span>
                          </div>
                          <span className="text-gray-300 font-medium">
                            {patient ? `${patient.firstName} ${patient.lastName}` : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300">
                          <div className="font-medium">
                            {new Date(record.recordDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(record.recordDate).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 max-w-xs truncate" title={record.recordDetails}>
                          {record.recordDetails}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300">
                          <div className="font-medium">
                            {doctor ? `${doctor.firstName} ${doctor.lastName}` : "N/A"}
                          </div>
                          {doctor && (
                            <div className="text-sm text-gray-500">{doctor.specialty}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {nurse ? `${nurse.firstName} ${nurse.lastName}` : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {prescription ? (
                          <div className="text-gray-300">
                            <div className="font-medium">{prescription.medicationName}</div>
                            <div className="text-sm text-gray-500">{prescription.dosage}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                      {(roles?.includes("Admin") || roles?.includes("Doctor")) && (
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingRecord(record);
                                setShowEditForm(true);
                              }}
                              className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors duration-200"
                              title="Edit record"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(record.id)}
                              className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors duration-200"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No records found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "No medical records available"}
              </p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {showEditForm && editingRecord && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-emerald-600/20 rounded-lg">
                    <Edit3 className="w-5 h-5 text-emerald-400" />
                  </div>
                  Edit Medical Record
                </h2>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Record Details
                  </label>
                  <textarea
                    value={editingRecord.recordDetails}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        recordDetails: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none"
                    placeholder="Enter detailed medical record information..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Doctor
                    </label>
                    <select
                      value={editingRecord.doctorId}
                      onChange={(e) =>
                        setEditingRecord({
                          ...editingRecord,
                          doctorId: Number(e.target.value),
                        })
                      }
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    >
                      <option value="0">Select a doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id} className="bg-gray-800">
                          {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nurse
                    </label>
                    <select
                      value={editingRecord.nurseId}
                      onChange={(e) =>
                        setEditingRecord({
                          ...editingRecord,
                          nurseId: Number(e.target.value),
                        })
                      }
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    >
                      <option value="0">Select a nurse</option>
                      {nurses.map((nurse) => (
                        <option key={nurse.id} value={nurse.id} className="bg-gray-800">
                          {nurse.firstName} {nurse.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prescription
                  </label>
                  <select
                    value={editingRecord.prescriptionId || ""}
                    onChange={(e) =>
                      setEditingRecord({
                        ...editingRecord,
                        prescriptionId: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                  >
                    <option value="">Select a prescription (optional)</option>
                    {prescriptions.map((prescription) => (
                      <option key={prescription.id} value={prescription.id} className="bg-gray-800">
                        {prescription.medicationName} - {prescription.dosage}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                  <ActionButton
                    onClick={() => setShowEditForm(false)}
                    variant="secondary"
                    icon={X}
                  >
                    Cancel
                  </ActionButton>
                  <ActionButton
                    onClick={handleUpdate}
                    variant="primary"
                    icon={Check}
                  >
                    Save Changes
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        )}

        <NewMedicalRecordModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
