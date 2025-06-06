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
    public class LectureController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public LectureController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LectureDto>>> GetAllLectures()
        {
            var Lectures = await _context.Lectures
                .AsNoTracking()
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<LectureDto>>(Lectures));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LectureDto>> GetLecturesById(int id)
        {
            var Lecturer = await _context.Lectures
          .AsNoTracking()
          .FirstOrDefaultAsync(d => d.LectureId == id);

            if (Lecturer == null)
            {
                throw new ArgumentException($"Lecture with ID {id} not found.");
            }

            return Ok(_mapper.Map<LectureDto>(Lecturer));
        }
        [HttpPost]
        public async Task<IActionResult> CreateLecture([FromBody] CULectureDto LecturerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Lecturer = _mapper.Map<Lecture>(LecturerDto);

            await _context.Lectures.AddAsync(Lecturer);
            await _context.SaveChangesAsync();
            return Ok("Success");

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLecture(int id, [FromBody] CULectureDto Lecturer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var RetLecturer = await _context.Lectures
                .FirstOrDefaultAsync(d => d.LectureId == id);

            if (RetLecturer == null)
            {
                throw new ArgumentException("Error");
            }

            var retLecturer = await _context.Lecturers
                .FirstOrDefaultAsync(d => d.LecturerId == Lecturer.LecturerId);
            if (retLecturer == null)
            {
                throw new ArgumentException("Error");
            }
            _mapper.Map(Lecturer, RetLecturer);

            // Save changes to the database.
            await _context.SaveChangesAsync();
            return Ok("Success"); // 204 No Content for successful update
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLecture(int id)
        {
            var Lecturer = await _context.Lectures
           .FirstOrDefaultAsync(d => d.LectureId == id);

            _context.Lectures.Remove(Lecturer);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }
    }
}
