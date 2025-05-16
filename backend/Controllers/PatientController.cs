using Microsoft.AspNetCore.Mvc;
using backend.Core.Entities;
using backend.Core.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _service;

        public PatientController(IPatientService service)
        {
            _service = service;
        }

        // GET: api/Patient
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var patients = await _service.GetAllAsync();
            return Ok(patients);
        }

        // GET: api/Patient/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var patient = await _service.GetByIdAsync(id);
            if (patient == null) return NotFound();
            return Ok(patient);
        }

        // POST: api/Patient
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Patient patient)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _service.CreateAsync(patient);
            return CreatedAtAction(nameof(GetById), new { id = created.PatientId }, created);
        }

        // PUT: api/Patient/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Patient patient)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _service.UpdateAsync(id, patient);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        // DELETE: api/Patient/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
