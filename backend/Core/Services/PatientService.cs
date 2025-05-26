using AutoMapper;
using backend.Core.DbContext;
using backend.Core.Dtos.General;
using backend.Core.Dtos.Patient;
using backend.Core.Entities;
using backend.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Services
{
    public class PatientService : IPatientService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PatientService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PatientDto>> GetAllAsync()
        {
            var patients = await _context.Patients.ToListAsync();
            return _mapper.Map<List<PatientDto>>(patients);
        }

        public async Task<PatientDto> GetByIdAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            return _mapper.Map<PatientDto>(patient);
        }

        public async Task<GeneralServiceResponseDto> CreateAsync(CUPatientDto dto)
        {
            var patient = _mapper.Map<Patient>(dto);

            await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();

            return new GeneralServiceResponseDto
            {
                IsSucceed = true,
                StatusCode = 201,
                Message = "Patient created successfully"
            };
        }

        public async Task<GeneralServiceResponseDto> UpdateAsync(int patientId, CUPatientDto patientDto)
        {
            var existingPatient = await _context.Patients
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.PatientId == patientId);

            if (existingPatient == null)
            {
                return new GeneralServiceResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = $"Patient with ID {patientId} not found."
                };
            }

            try
            {
                var updatedPatient = _mapper.Map<Patient>(patientDto);
                updatedPatient.PatientId = patientId;
                _context.Patients.Update(updatedPatient);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return new GeneralServiceResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 500,
                    Message = "An error occurred while updating the patient."
                };
            }

            return new GeneralServiceResponseDto
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = $"Patient with ID {patientId} has been updated successfully."
            };
        }

        public async Task<GeneralServiceResponseDto> DeleteAsync(int patientId)
        {
            var patient = await _context.Patients.FindAsync(patientId);
            if (patient == null)
            {
                return new GeneralServiceResponseDto
                {
                    IsSucceed = false,
                    StatusCode = 404,
                    Message = "Patient not found."
                };
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return new GeneralServiceResponseDto
            {
                IsSucceed = true,
                StatusCode = 200,
                Message = "Patient deleted successfully."
            };
        }
    }
}
