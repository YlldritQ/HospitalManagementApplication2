using backend.Core.DbContext;
using backend.Core.Dtos.EmergencyContact;
using backend.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmergencyContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public EmergencyContactsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // Helper: Get current user ID from JWT
        private string GetCurrentUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

        // GET: api/EmergencyContacts
        // List all emergency contacts for the current user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmergencyContactDto>>> GetMyContacts()
        {
            var userId = GetCurrentUserId();
            var contacts = await _context.EmergencyContacts
                .Where(ec => ec.UserId == userId)
                .Select(ec => new EmergencyContactDto
                {
                    EmergencyContactId = ec.EmergencyContactId,
                    FullName = ec.FullName,
                    PhoneNumber = ec.PhoneNumber,
                    Relationship = ec.Relationship,
                    IsPrimary = ec.IsPrimary
                })
                .ToListAsync();
            return Ok(contacts);
        }

        // POST: api/EmergencyContacts
        // Add a new emergency contact for the current user
        [HttpPost]
        public async Task<ActionResult> AddContact([FromBody] EmergencyContactCreateUpdateDto dto)
        {
            var userId = GetCurrentUserId();
            var count = await _context.EmergencyContacts.CountAsync(ec => ec.UserId == userId);
            if (count >= 3)
                return BadRequest("You can only have up to 3 emergency contacts.");

            // If this is set as primary, unset other primaries
            if (dto.IsPrimary)
            {
                var primaries = _context.EmergencyContacts.Where(ec => ec.UserId == userId && ec.IsPrimary);
                foreach (var p in primaries)
                {
                    p.IsPrimary = false;
                }
            }

            var contact = new EmergencyContact
            {
                UserId = userId,
                FullName = dto.FullName,
                PhoneNumber = dto.PhoneNumber,
                Relationship = dto.Relationship,
                IsPrimary = dto.IsPrimary
            };
            _context.EmergencyContacts.Add(contact);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: api/EmergencyContacts/{id}
        // Update an existing emergency contact
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContact(int id, [FromBody] EmergencyContactCreateUpdateDto dto)
        {
            var userId = GetCurrentUserId();
            var contact = await _context.EmergencyContacts.FirstOrDefaultAsync(ec => ec.EmergencyContactId == id && ec.UserId == userId);
            if (contact == null)
                return NotFound();

            // If setting as primary, unset other primaries
            if (dto.IsPrimary)
            {
                var primaries = _context.EmergencyContacts.Where(ec => ec.UserId == userId && ec.IsPrimary && ec.EmergencyContactId != id);
                foreach (var p in primaries)
                {
                    p.IsPrimary = false;
                }
            }

            contact.FullName = dto.FullName;
            contact.PhoneNumber = dto.PhoneNumber;
            contact.Relationship = dto.Relationship;
            contact.IsPrimary = dto.IsPrimary;
            contact.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: api/EmergencyContacts/{id}
        // Delete an emergency contact
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            var userId = GetCurrentUserId();
            var contact = await _context.EmergencyContacts.FirstOrDefaultAsync(ec => ec.EmergencyContactId == id && ec.UserId == userId);
            if (contact == null)
                return NotFound();

            _context.EmergencyContacts.Remove(contact);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/EmergencyContacts/user/{userId}
        // Doctor view: get emergency contacts for a specific user
        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Doctor")]
        public async Task<ActionResult<IEnumerable<EmergencyContactDto>>> GetContactsForUser(string userId)
        {
            var contacts = await _context.EmergencyContacts
                .Where(ec => ec.UserId == userId)
                .Select(ec => new EmergencyContactDto
                {
                    EmergencyContactId = ec.EmergencyContactId,
                    FullName = ec.FullName,
                    PhoneNumber = ec.PhoneNumber,
                    Relationship = ec.Relationship,
                    IsPrimary = ec.IsPrimary
                })
                .ToListAsync();
            return Ok(contacts);
        }
    }
} 