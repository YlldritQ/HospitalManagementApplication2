// types/medicalRecordTypes.ts

export interface PatientSnapshot {
    patientId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    contactInfo: string;
    userId: string;
}

export interface DoctorSnapshot {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    contactInfo: string;
    dateOfBirth: Date;
    dateHired: Date;
    specialty: string;
    qualifications: string;
    isAvailable: boolean;
    departmentId: number;
    userId: string;
}

export interface NurseSnapshot {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    contactInfo: string;
    dateOfBirth: Date;
    dateHired: Date;
    qualifications: string;
    isAvailable: boolean;
    departmentId: number;
    userId: string;
}

export interface PrescriptionSnapshot {
    id: number;
    patientId: number;
    patientName: string;
    doctorId: number;
    doctorName: string;
    dateIssued: Date;
    medicationName: string;
    dosage: string;
    instructions: string;
}

export interface MedicalRecordDto {
    id: number;
    patientId: number;
    patientInfo: PatientSnapshot;
    recordDate: string;
    recordDetails: string;
    doctorId?: number;
    doctorInfo?: DoctorSnapshot;
    nurseId?: number;
    nurseInfo?: NurseSnapshot;
    prescriptionId?: number;
    prescriptionInfo?: PrescriptionSnapshot;
}

export interface CUMedicalRecordDto {
    patientId: number;
    recordDetails: string;
    doctorId?: number;
    nurseId?: number;
    prescriptionId?: number;
}

export interface MedicalRecord {
    id: string;
    patientId: number;
    patientInfo: PatientSnapshot;
    recordDate: string;
    recordDetails: string;
    doctorId?: number;
    doctorInfo?: DoctorSnapshot;
    nurseId?: number;
    nurseInfo?: NurseSnapshot;
    prescriptionId?: number;
    prescriptionInfo?: PrescriptionSnapshot;
}
