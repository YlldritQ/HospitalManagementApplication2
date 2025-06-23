using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Core.Dtos.General;
using backend.Core.Dtos.Records;

public interface IMedicalRecordService
{
    Task<MedicalRecordDto> GetMedicalRecordByIdAsync(string recordId);

    Task<IEnumerable<MedicalRecordDto>> GetMedicalRecordByUserId(string id);
    Task<IEnumerable<MedicalRecordDto>> GetAllMedicalRecordsAsync();
    Task<GeneralServiceResponseDto> CreateMedicalRecordAsync(CUMedicalRecordDto recordDto);
    Task<GeneralServiceResponseDto> UpdateMedicalRecordAsync(string recordId, CUMedicalRecordDto recordDto);
    Task DeleteMedicalRecordAsync(string recordId);
}
