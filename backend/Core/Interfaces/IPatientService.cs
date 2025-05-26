using backend.Core.Dtos.Patient;
using backend.Core.Dtos.General;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Core.Interfaces
{
    public interface IPatientService
    {
        Task<List<PatientDto>> GetAllAsync();
        Task<PatientDto> GetByIdAsync(int id);
        Task<GeneralServiceResponseDto> CreateAsync(CUPatientDto dto);
        Task<GeneralServiceResponseDto> UpdateAsync(int id, CUPatientDto dto);
        Task<GeneralServiceResponseDto> DeleteAsync(int id);
    }

}
