using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Core.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;

        public Doctor? Doctor { get; set; }
        public Nurse? Nurse { get; set; }
        public virtual Patient? Patient { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [NotMapped]
        public IList<string> Roles { get; set; } = new List<string>();
    }
}