using AutoMapper;
using backend.Core.Constants;
using backend.Core.DbContext;
using backend.Core.Dtos.Appointment;
using backend.Core.Dtos.Doctor;
using backend.Core.Dtos.General;
using backend.Core.Dtos.Nurse;
using backend.Core.Dtos.Prescription;
using backend.Core.Dtos.Records;
using backend.Core.Entities;
using backend.Core.Interfaces;
using MongoDB.Driver;

namespace backend.Core.Services
{
    public class MedicalRecordService : IMedicalRecordService
    {
        private readonly MongoDbContext _mongoContext;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IPatientService _patientService;
        private readonly IDoctorService _doctorService;
        private readonly INurseService _nurseService;
        private readonly IPrescriptionService _prescriptionService;

        public MedicalRecordService(
            MongoDbContext mongoContext,
            IMapper mapper,
            IAuthService authService,
            IPatientService patientService,
            IDoctorService doctorService,
            INurseService nurseService,
            IPrescriptionService prescriptionService)
        {
            _mongoContext = mongoContext;
            _mapper = mapper;
            _authService = authService;
            _patientService = patientService;
            _doctorService = doctorService;
            _nurseService = nurseService;
            _prescriptionService = prescriptionService;
        }

        public async Task<MedicalRecordDto> GetMedicalRecordByIdAsync(string recordId)
        {
            var filter = Builders<MedicalRecord>.Filter.Eq(r => r.Id, recordId);
            var record = await _mongoContext.MedicalRecords.Find(filter).FirstOrDefaultAsync();
            if (record == null)
                throw new ArgumentException($"Medical record with ID {recordId} not found.");
            return _mapper.Map<MedicalRecordDto>(record);
        }

        public async Task<IEnumerable<MedicalRecordDto>> GetMedicalRecordByUserId(string id)
        {
            var userRoles = await _authService.GetRolesById(id);
            if (userRoles == null)
                throw new ArgumentException("No roles found for the user.");
            IEnumerable<MedicalRecord> records = Enumerable.Empty<MedicalRecord>();
            if (userRoles.Contains(StaticUserRoles.PATIENT))
            {
                var patient = await _patientService.GetPatientByUserIdAsync(id);
                if (patient != null)
                {
                    var filter = Builders<MedicalRecord>.Filter.Eq(r => r.PatientId, patient.PatientId);
                    records = await _mongoContext.MedicalRecords.Find(filter).ToListAsync();
                }
            }
            else if (userRoles.Contains(StaticUserRoles.DOCTOR))
            {
                var doctor = await _doctorService.GetDoctorByUserIdAsync(id);
                if (doctor != null)
                {
                    var filter = Builders<MedicalRecord>.Filter.Eq(r => r.DoctorId, doctor.Id);
                    records = await _mongoContext.MedicalRecords.Find(filter).ToListAsync();
                }
            }
            else if (userRoles.Contains(StaticUserRoles.NURSE))
            {
                var nurse = await _nurseService.GetNurseByUserIdAsync(id);
                if (nurse != null)
                {
                    var filter = Builders<MedicalRecord>.Filter.Eq(r => r.NurseId, nurse.Id);
                    records = await _mongoContext.MedicalRecords.Find(filter).ToListAsync();
                }
            }
            else
            {
                throw new ArgumentException("The user is not authorized to view medical records.");
            }
            if (records == null || !records.Any())
                throw new ArgumentException("No medical records found for the given user.");
            return _mapper.Map<IEnumerable<MedicalRecordDto>>(records);
        }

        public async Task<IEnumerable<MedicalRecordDto>> GetAllMedicalRecordsAsync()
        {
            var records = await _mongoContext.MedicalRecords.Find(_ => true).ToListAsync();
            return _mapper.Map<IEnumerable<MedicalRecordDto>>(records);
        }

        public async Task<GeneralServiceResponseDto> CreateMedicalRecordAsync(CUMedicalRecordDto recordDto)
        {
            // Validate and fetch related entities
            var patient = await _patientService.GetPatientByIdAsync(recordDto.PatientId);
            if (patient == null)
                throw new ArgumentException($"Patient with ID {recordDto.PatientId} not found.");
            DoctorDto doctor = null;
            if (recordDto.DoctorId.HasValue)
            {
                doctor = await _doctorService.GetDoctorByIdAsync(recordDto.DoctorId.Value);
                if (doctor == null)
                    throw new ArgumentException($"Doctor with ID {recordDto.DoctorId.Value} not found.");
            }
            NurseDto nurse = null;
            if (recordDto.NurseId.HasValue)
            {
                nurse = await _nurseService.GetNurseByIdAsync(recordDto.NurseId.Value);
                if (nurse == null)
                    throw new ArgumentException($"Nurse with ID {recordDto.NurseId.Value} not found.");
            }
            PrescriptionDto prescription = null;
            if (recordDto.PrescriptionId.HasValue)
            {
                prescription = await _prescriptionService.GetPrescriptionByIdAsync(recordDto.PrescriptionId.Value);
                if (prescription == null)
                    throw new ArgumentException($"Prescription with ID {recordDto.PrescriptionId.Value} not found.");
            }
            // Map and snapshot
            var record = _mapper.Map<MedicalRecord>(recordDto);
            record.RecordDate = DateTime.Now;
            record.PatientInfo = new PatientSnapshot
            {
                PatientId = patient.PatientId,
                FirstName = patient.FirstName,
                LastName = patient.LastName,
                DateOfBirth = patient.DateOfBirth,
                Gender = patient.Gender,
                ContactInfo = patient.ContactInfo,
                UserId = patient.UserId
            };
            if (doctor != null)
            {
                record.DoctorInfo = new DoctorSnapshot
                {
                    Id = doctor.Id,
                    FirstName = doctor.FirstName,
                    LastName = doctor.LastName,
                    Gender = doctor.Gender,
                    ContactInfo = doctor.ContactInfo,
                    DateOfBirth = doctor.DateOfBirth,
                    DateHired = doctor.DateHired,
                    Specialty = doctor.Specialty,
                    Qualifications = doctor.Qualifications,
                    IsAvailable = doctor.IsAvailable,
                    DepartmentId = doctor.DepartmentId,
                    UserId = doctor.UserId
                };
            }
            if (nurse != null)
            {
                record.NurseInfo = new NurseSnapshot
                {
                    Id = nurse.Id,
                    FirstName = nurse.FirstName,
                    LastName = nurse.LastName,
                    Gender = nurse.Gender,
                    ContactInfo = nurse.ContactInfo,
                    DateOfBirth = nurse.DateOfBirth,
                    DateHired = nurse.DateHired,
                    Qualifications = nurse.Qualifications,
                    IsAvailable = nurse.IsAvailable,
                    DepartmentId = nurse.DepartmentId,
                    UserId = nurse.UserId
                };
            }
            if (prescription != null)
            {
                record.PrescriptionInfo = new PrescriptionSnapshot
                {
                    Id = prescription.Id,
                    PatientId = prescription.PatientId,
                    PatientName = prescription.PatientName,
                    DoctorId = prescription.DoctorId,
                    DoctorName = prescription.DoctorName,
                    DateIssued = prescription.DateIssued,
                    MedicationName = prescription.MedicationName,
                    Dosage = prescription.Dosage,
                    Instructions = prescription.Instructions
                };
            }
            await _mongoContext.MedicalRecords.InsertOneAsync(record);
            return new GeneralServiceResponseDto()
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "MedicalRecord Inserted"
            };
        }

        public async Task<GeneralServiceResponseDto> UpdateMedicalRecordAsync(string recordId, CUMedicalRecordDto recordDto)
        {
            // Validate and fetch related entities
            var patient = await _patientService.GetPatientByIdAsync(recordDto.PatientId);
            if (patient == null)
                throw new ArgumentException($"Patient with ID {recordDto.PatientId} not found.");
            DoctorDto doctor = null;
            if (recordDto.DoctorId.HasValue)
            {
                doctor = await _doctorService.GetDoctorByIdAsync(recordDto.DoctorId.Value);
                if (doctor == null)
                    throw new ArgumentException($"Doctor with ID {recordDto.DoctorId.Value} not found.");
            }
            NurseDto nurse = null;
            if (recordDto.NurseId.HasValue)
            {
                nurse = await _nurseService.GetNurseByIdAsync(recordDto.NurseId.Value);
                if (nurse == null)
                    throw new ArgumentException($"Nurse with ID {recordDto.NurseId.Value} not found.");
            }
            PrescriptionDto prescription = null;
            if (recordDto.PrescriptionId.HasValue)
            {
                prescription = await _prescriptionService.GetPrescriptionByIdAsync(recordDto.PrescriptionId.Value);
                if (prescription == null)
                    throw new ArgumentException($"Prescription with ID {recordDto.PrescriptionId.Value} not found.");
            }
            // Build update definition with denormalized data
            var update = Builders<MedicalRecord>.Update
                .Set(r => r.PatientId, recordDto.PatientId)
                .Set(r => r.PatientInfo, new PatientSnapshot
                {
                    PatientId = patient.PatientId,
                    FirstName = patient.FirstName,
                    LastName = patient.LastName,
                    DateOfBirth = patient.DateOfBirth,
                    Gender = patient.Gender,
                    ContactInfo = patient.ContactInfo,
                    UserId = patient.UserId
                })
                .Set(r => r.DoctorId, recordDto.DoctorId)
                .Set(r => r.DoctorInfo, doctor != null ? new DoctorSnapshot
                {
                    Id = doctor.Id,
                    FirstName = doctor.FirstName,
                    LastName = doctor.LastName,
                    Gender = doctor.Gender,
                    ContactInfo = doctor.ContactInfo,
                    DateOfBirth = doctor.DateOfBirth,
                    DateHired = doctor.DateHired,
                    Specialty = doctor.Specialty,
                    Qualifications = doctor.Qualifications,
                    IsAvailable = doctor.IsAvailable,
                    DepartmentId = doctor.DepartmentId,
                    UserId = doctor.UserId
                } : null)
                .Set(r => r.NurseId, recordDto.NurseId)
                .Set(r => r.NurseInfo, nurse != null ? new NurseSnapshot
                {
                    Id = nurse.Id,
                    FirstName = nurse.FirstName,
                    LastName = nurse.LastName,
                    Gender = nurse.Gender,
                    ContactInfo = nurse.ContactInfo,
                    DateOfBirth = nurse.DateOfBirth,
                    DateHired = nurse.DateHired,
                    Qualifications = nurse.Qualifications,
                    IsAvailable = nurse.IsAvailable,
                    DepartmentId = nurse.DepartmentId,
                    UserId = nurse.UserId
                } : null)
                .Set(r => r.PrescriptionId, recordDto.PrescriptionId)
                .Set(r => r.PrescriptionInfo, prescription != null ? new PrescriptionSnapshot
                {
                    Id = prescription.Id,
                    PatientId = prescription.PatientId,
                    PatientName = prescription.PatientName,
                    DoctorId = prescription.DoctorId,
                    DoctorName = prescription.DoctorName,
                    DateIssued = prescription.DateIssued,
                    MedicationName = prescription.MedicationName,
                    Dosage = prescription.Dosage,
                    Instructions = prescription.Instructions
                } : null)
                .Set(r => r.RecordDate, DateTime.Now)
                .Set(r => r.RecordDetails, recordDto.RecordDetails);
            var filter = Builders<MedicalRecord>.Filter.Eq(r => r.Id, recordId);
            var result = await _mongoContext.MedicalRecords.UpdateOneAsync(filter, update);
            if (result.MatchedCount == 0)
            {
                return new GeneralServiceResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = $"Medical record with ID {recordId} not found."
                };
            }
            return new GeneralServiceResponseDto
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "MedicalRecord Updated"
            };
        }

        public async Task DeleteMedicalRecordAsync(string recordId)
        {
            var filter = Builders<MedicalRecord>.Filter.Eq(r => r.Id, recordId);
            await _mongoContext.MedicalRecords.DeleteOneAsync(filter);
        }
    }
}