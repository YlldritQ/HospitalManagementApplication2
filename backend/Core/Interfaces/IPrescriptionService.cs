﻿using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Core.Dtos.General;
using backend.Core.Dtos.Prescription;

public interface IPrescriptionService
{
    Task<PrescriptionDto> GetPrescriptionByIdAsync(int prescriptionId);
    Task<IEnumerable<PrescriptionDto>> GetAllPrescriptionsAsync();
    Task<PrescriptionDto> CreatePrescriptionAsync(CUPrescriptionDto prescriptionDto);
    Task<GeneralServiceResponseDto> UpdatePrescriptionAsync(int prescriptionId, CUPrescriptionDto prescriptionDto);
    Task DeletePrescriptionAsync(int prescriptionId);
}
