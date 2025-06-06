using AutoMapper;
using backend.Core.DbContext;
using backend.Core.Dtos;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LecturerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public LecturerController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LecturerDto>>> GetAllLecturers()
        {
            var Lecturers = await _context.Lecturers
           .AsNoTracking()
           .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<LecturerDto>>(Lecturers));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LecturerDto>> GetLecturersById(int id)
        {
            var Lecturer = await _context.Lecturers
          .AsNoTracking()
          .Include(d => d.Lectures)
          .FirstOrDefaultAsync(d => d.LecturerId == id);

            if (Lecturer == null)
            {
                throw new ArgumentException($"Lecturer with ID {id} not found.");
            }

            return Ok(_mapper.Map<LecturerDto>(Lecturer));
        }

        [HttpPost]
        public async Task<IActionResult> CreateLecturer([FromBody] CULecturerDto LecturerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Lecturer = _mapper.Map<Lecturer>(LecturerDto);

            await _context.Lecturers.AddAsync(Lecturer);
            await _context.SaveChangesAsync();
            return Ok("Success");

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, [FromBody] CULecturerDto Lecturer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var RetLecturer = await _context.Lecturers
                .FirstOrDefaultAsync(d => d.LecturerId == id);

            if (RetLecturer == null)
            {
                throw new ArgumentException("Error");
            }
            _mapper.Map(Lecturer, RetLecturer);

            // Save changes to the database.
            await _context.SaveChangesAsync();
            return Ok("Success"); // 204 No Content for successful update
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLecturer(int id)
        {
            var Lecturer = await _context.Lecturers
           .Include(d => d.Lectures)
           .FirstOrDefaultAsync(d => d.LecturerId == id);

            _context.Lecturers.Remove(Lecturer);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }
    }
}
