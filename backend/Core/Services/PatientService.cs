using backend.Core.DbContext;
using backend.Core.Entities;
using backend.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Services
{
    public class PatientService : IPatientService
    {
        private readonly ApplicationDbContext _context;

        public PatientService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all patients
        public async Task<List<Patient>> GetAllAsync()
        {
            return await _context.Patients.ToListAsync();
        }

        // Get a patient by ID
        public async Task<Patient> GetByIdAsync(int id)
        {
            return await _context.Patients.FirstOrDefaultAsync(p => p.PatientId == id);
        }

        // Create a new patient
        public async Task<Patient> CreateAsync(Patient patient)
        {
            if (patient == null) return null;

            await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        // Update an existing patient
        public async Task<Patient> UpdateAsync(int id, Patient patient)
        {
            var existingPatient = await _context.Patients.FirstOrDefaultAsync(p => p.PatientId == id);
            if (existingPatient == null) return null;

            existingPatient.FullName = patient.FullName;
            existingPatient.Gender = patient.Gender;
            existingPatient.BirthDate = patient.BirthDate;
            existingPatient.Phone = patient.Phone;

            await _context.SaveChangesAsync();
            return existingPatient;
        }

        // Delete a patient by ID
        public async Task<bool> DeleteAsync(int id)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.PatientId == id);
            if (patient == null) return false;

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
