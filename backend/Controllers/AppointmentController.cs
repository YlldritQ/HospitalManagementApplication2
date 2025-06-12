using backend.Core.Constants;
using backend.Core.Dtos.Appointment;
using backend.Core.Hubs; // ✅ SignalR Hub namespace
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR; // ✅ IHubContext
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;
        private readonly IHubContext<NotificationHub> _hubContext;

        public AppointmentController(
            IAppointmentService appointmentService,
            IHubContext<NotificationHub> hubContext)
        {
            _appointmentService = appointmentService;
            _hubContext = hubContext;
        }

        [HttpGet("GetAllAppointments")]
        [Authorize(Roles = StaticUserRoles.AdminDoctor)]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAllAppointments()
        {
            var appointments = await _appointmentService.GetAllAppointmentsAsync();
            return Ok(appointments);
        }

        [HttpGet("GetAppointmentsByUser/{id}")]
        [Authorize(Roles = StaticUserRoles.AdminDoctorNursePatient)]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAppointmentsByUserId(string id)
        {
            var appointments = await _appointmentService.GetAppointmentsByUserId(id);
            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentDto>> GetAppointmentById(int id)
        {
            var appointment = await _appointmentService.GetAppointmentByIdAsync(id);
            if (appointment == null)
                return NotFound();

            return Ok(appointment);
        }

        [HttpPost]
        public async Task<ActionResult> CreateAppointment([FromBody] CUAppointmentDto appointmentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var res = await _appointmentService.CreateAppointmentAsync(appointmentDto);

            // ✅ Send real-time notification
            await _hubContext.Clients.All.SendAsync(
                "ReceiveNotification",
                $"📅 New appointment created for {appointmentDto.PatientId.ToString()}.");

            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(int id, [FromBody] CUAppointmentDto appointmentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingAppointment = await _appointmentService.GetAppointmentByIdAsync(id);
            if (existingAppointment == null)
                return NotFound();

            var res = await _appointmentService.UpdateAppointmentAsync(id, appointmentDto);

            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var existingAppointment = await _appointmentService.GetAppointmentByIdAsync(id);
            if (existingAppointment == null)
                return NotFound();

            await _appointmentService.DeleteAppointmentAsync(id);

            return NoContent();
        }
    }
}
