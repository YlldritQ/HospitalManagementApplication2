import jsPDF from "jspdf";
import "jspdf-autotable";
import { MedicalRecordDto } from "../types/medicalRecordTypes";
import { DoctorDto } from "../types/doctorTypes";
import { NurseDto } from "../types/nurseTypes";
import { PrescriptionDto } from "../types/prescriptionTypes";
import { PatientDto } from "../types/patientTypes";

export const generateMedicalRecordsPDF = (
  patient: PatientDto,
  records: MedicalRecordDto[],
  doctors: DoctorDto[],
  nurses: NurseDto[],
  prescriptions: PrescriptionDto[]
) => {
  const doc = new jsPDF();

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Hospital Management", doc.internal.pageSize.getWidth() / 2, 20, {
    align: "center",
  });

  // Optional logo
  // doc.addImage("logo.png", "PNG", 10, 10, 30, 30);

  doc.setLineWidth(0.5);
  doc.line(15, 25, doc.internal.pageSize.getWidth() - 15, 25);

  doc.setFontSize(16);
  doc.text(
    `Medical Records Report for ${patient.firstName} ${patient.lastName}`,
    doc.internal.pageSize.getWidth() / 2,
    35,
    { align: "center" }
  );

  doc.setLineWidth(0.1);
  doc.line(15, 40, doc.internal.pageSize.getWidth() - 15, 40);

  // --- Patient Details ---
  let yPosition = 50;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Patient Information", 15, yPosition);
  yPosition += 7;

  doc.setFont("helvetica", "normal");
  doc.text(`ID: ${patient.patientId}`, 15, yPosition);
  yPosition += 6;
  doc.text(
    `Name: ${patient.firstName} ${patient.lastName}`,
    15,
    yPosition
  );
  yPosition += 6;
  doc.text(
    `Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}`,
    15,
    yPosition
  );
  yPosition += 6;
  doc.text(`Gender: ${patient.gender || "Unknown"}`, 15, yPosition);
  yPosition += 6;
  doc.text(`Contact: ${patient.contactInfo || "N/A"}`, 15, yPosition);
  yPosition += 10;

  doc.setLineWidth(0.1);
  doc.line(15, yPosition, doc.internal.pageSize.getWidth() - 15, yPosition);
  yPosition += 10;

  // --- Records ---
  doc.setFont("helvetica", "bold");
  doc.text("Medical Records:", 15, yPosition);
  yPosition += 8;

  records.forEach((record, index) => {
    const doctor = doctors.find((d) => d.id === record.doctorId);
    const nurse = nurses.find((n) => n.id === record.nurseId);
    const prescription =
      prescriptions.find((p) => p.id === record.prescriptionId) || null;

    const recordPrescriptions = prescription
      ? `${prescription.medicationName} (${prescription.dosage})`
      : "N/A";

    doc.setFont("helvetica", "bold");
    doc.text(`Record ${index + 1}`, 15, yPosition);
    yPosition += 6;

    doc.setFont("helvetica", "normal");
    doc.text(
      `Date: ${new Date(record.recordDate).toLocaleString()}`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Details: ${record.recordDetails}`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Doctor: ${doctor
        ? `${doctor.firstName} ${doctor.lastName} (${doctor.specialty})`
        : "N/A"
      }`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Nurse: ${nurse
        ? `${nurse.firstName} ${nurse.lastName}`
        : "N/A"
      }`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Prescriptions: ${recordPrescriptions}`,
      18,
      yPosition
    );
    yPosition += 10;

    doc.setLineWidth(0.1);
    doc.line(15, yPosition - 3, doc.internal.pageSize.getWidth() - 15, yPosition - 3);
    yPosition += 5;

    if (yPosition > doc.internal.pageSize.height - 40) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // --- Signatures ---
  yPosition += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Signatures", 15, yPosition);
  yPosition += 10;

  doc.setFont("helvetica", "normal");
  doc.text("Doctor: ___________________________", 15, yPosition);
  yPosition += 10;
  doc.text("Nurse: ____________________________", 15, yPosition);
  yPosition += 10;
  doc.text("Patient: __________________________", 15, yPosition);

  doc.setFontSize(10);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    15,
    doc.internal.pageSize.height - 10
  );

  doc.save(
    `medical-records-${patient.firstName}-${patient.lastName}-${new Date().getTime()}.pdf`
  );
};



export const generatePrescriptionsPDF = (
  patient: PatientDto,
  records: MedicalRecordDto[],
  doctors: DoctorDto[],
  prescriptions: PrescriptionDto[]
) => {
  const doc = new jsPDF();

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Hospital Management", doc.internal.pageSize.getWidth() / 2, 20, {
    align: "center",
  });

  doc.setLineWidth(0.5);
  doc.line(15, 25, doc.internal.pageSize.getWidth() - 15, 25);

  doc.setFontSize(16);
  doc.text(
    `Prescription Report for ${patient.firstName} ${patient.lastName}`,
    doc.internal.pageSize.getWidth() / 2,
    35,
    { align: "center" }
  );

  doc.setLineWidth(0.1);
  doc.line(15, 40, doc.internal.pageSize.getWidth() - 15, 40);

  // --- Patient Info ---
  let yPosition = 50;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Patient Information", 15, yPosition);
  yPosition += 7;

  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${patient.firstName} ${patient.lastName}`, 15, yPosition);
  yPosition += 6;
  doc.text(
    `Date of Birth: ${new Date(patient.dateOfBirth).toLocaleDateString()}`,
    15,
    yPosition
  );
  yPosition += 10;

  doc.setLineWidth(0.1);
  doc.line(15, yPosition, doc.internal.pageSize.getWidth() - 15, yPosition);
  yPosition += 10;

  // --- Prescription Records ---
  doc.setFont("helvetica", "bold");
  doc.text("Prescriptions:", 15, yPosition);
  yPosition += 8;

  records.forEach((record, index) => {
    const doctor = doctors.find((d) => d.id === record.doctorId);
    const prescription = prescriptions.find(
      (p) => p.id === record.prescriptionId
    );

    doc.setFont("helvetica", "bold");
    doc.text(`Record ${index + 1}`, 15, yPosition);
    yPosition += 6;

    doc.setFont("helvetica", "normal");
    doc.text(
      `Doctor: ${doctor ? `${doctor.firstName} ${doctor.lastName}` : "N/A"}`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Prescription: ${prescription?.medicationName || "N/A"}`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Dosage: ${prescription?.dosage || "N/A"}`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Instructions: ${prescription?.instructions || "N/A"}`,
      18,
      yPosition
    );
    yPosition += 5;

    doc.text(
      `Date Issued: ${prescription?.dateIssued || "N/A"}`,
      18,
      yPosition
    );
    yPosition += 10;

    doc.setLineWidth(0.1);
    doc.line(15, yPosition - 3, doc.internal.pageSize.getWidth() - 15, yPosition - 3);
    yPosition += 5;

    if (yPosition > doc.internal.pageSize.height - 40) {
      doc.addPage();
      yPosition = 20;
    }
  });

  // --- Signatures ---
  yPosition += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Signatures", 15, yPosition);
  yPosition += 10;

  doc.setFont("helvetica", "normal");
  doc.text("Doctor: ___________________________", 15, yPosition);
  yPosition += 10;
  doc.text("Patient: __________________________", 15, yPosition);

  doc.setFontSize(10);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString()}`,
    15,
    doc.internal.pageSize.height - 10
  );

  doc.save(
    `prescription-records-${patient.firstName}-${patient.lastName}-${new Date().getTime()}.pdf`
  );
};
