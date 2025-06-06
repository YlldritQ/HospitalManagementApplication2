﻿using backend.Core.Constants;
using backend.Core.Dtos.Appointment;
using backend.Core.Dtos.Records;
using backend.Core.Interfaces;
using backend.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalRecordController : ControllerBase
    {
        private readonly IMedicalRecordService _medicalRecordService;

        public MedicalRecordController(IMedicalRecordService medicalRecordService)
        {
            _medicalRecordService = medicalRecordService;
        }

        // GET: api/medicalrecord
        [HttpGet]
        [Authorize(Roles = StaticUserRoles.AdminDoctorNursePatient)]
        public async Task<ActionResult<IEnumerable<MedicalRecordDto>>> GetAllMedicalRecords()
        {
            var records = await _medicalRecordService.GetAllMedicalRecordsAsync();
            return Ok(records);
        }

        // GET: api/medicalrecord/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalRecordDto>> GetMedicalRecordById(int id)
        {
            var record = await _medicalRecordService.GetMedicalRecordByIdAsync(id);
            if (record == null)
            {
                return NotFound();
            }
            return Ok(record);
        }

        // Get: api/medicalrecordbyuserid
        [HttpGet("GetMedicalRecordByUser/{id}")]
        [Authorize(Roles = StaticUserRoles.AdminDoctorNursePatient)]
        public async Task<ActionResult<IEnumerable<MedicalRecordDto>>> GetMedicalRecordByUserId(string id)
        {
            var records = await _medicalRecordService.GetMedicalRecordByUserId(id);
            return Ok(records);
        }

        // POST: api/medicalrecord
        [HttpPost]
        [Authorize(Roles = StaticUserRoles.AdminDoctorNurse)]
        public async Task<ActionResult> CreateMedicalRecord([FromBody] CUMedicalRecordDto recordDto)
        {
            // Log the user's role to verify that nurses are correctly authenticated
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            Console.WriteLine($"User Role: {userRole}");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _medicalRecordService.CreateMedicalRecordAsync(recordDto);
            return Ok(record);
        }

        // PUT: api/medicalrecord/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMedicalRecord(int id, [FromBody] CUMedicalRecordDto recordDto)
        {
            // Validate the model state.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the record exists before updating.
            var existingRecord = await _medicalRecordService.GetMedicalRecordByIdAsync(id);
            if (existingRecord == null)
            {
                return NotFound(new { Message = $"Medical record with ID {id} not found." });
            }

            // Call the service to update the medical record.
            var response = await _medicalRecordService.UpdateMedicalRecordAsync(id, recordDto);

            // Handle the response based on the service result.
            if (!response.IsSucceed)
            {
                // Return appropriate status code based on the response.
                return StatusCode(response.StatusCode, new { Message = response.Message });
            }

            // If successful, return No Content (204).
            return Ok(response);
        }


        // DELETE: api/medicalrecord/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalRecord(int id)
        {
            var existingRecord = await _medicalRecordService.GetMedicalRecordByIdAsync(id);
            if (existingRecord == null)
            {
                return NotFound();
            }

            await _medicalRecordService.DeleteMedicalRecordAsync(id);

            return NoContent(); // 204 No Content
        }
    }
}
