using backend.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Core.Interfaces
{
    public interface IPatientService
    {
        Task<List<Patient>> GetAllAsync();
        Task<Patient> GetByIdAsync(int id);
        Task<Patient> CreateAsync(Patient patient);
        Task<Patient> UpdateAsync(int id, Patient patient);
        Task<bool> DeleteAsync(int id);
    }
}
