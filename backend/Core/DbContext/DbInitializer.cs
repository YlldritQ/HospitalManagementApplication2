using backend.Core.Entities;
using backend.Core.Constants;
using Microsoft.AspNetCore.Identity;

namespace backend.Core.DbContext
{
    public static class DbInitializer
    {
        public static async Task SeedAdminUserAsync(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync(StaticUserRoles.ADMIN))
            {
                await roleManager.CreateAsync(new IdentityRole
                {
                    Name = StaticUserRoles.ADMIN,
                    NormalizedName = StaticUserRoles.ADMIN.ToUpper()
                });
            }

            var adminUser = await userManager.FindByNameAsync("adminUser");
            if (adminUser == null)
            {
                var user = new ApplicationUser
                {
                    FirstName = "Admin",
                    LastName = "User",
                    UserName = "adminUser",
                    Email = "admin@hospital.com",
                    Address = "Address",
                    Gender = "Male",
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                var result = await userManager.CreateAsync(user, "Admin@123");
                if (!result.Succeeded)
                {
                    var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                    throw new Exception($"Failed to create admin user: {errors}");
                }

                await userManager.AddToRoleAsync(user, StaticUserRoles.ADMIN);
            }
            else
            {
                // ensure the user has Admin role
                var roles = await userManager.GetRolesAsync(adminUser);
                if (!roles.Contains(StaticUserRoles.ADMIN))
                {
                    await userManager.AddToRoleAsync(adminUser, StaticUserRoles.ADMIN);
                }
            }
        }
    }
}
