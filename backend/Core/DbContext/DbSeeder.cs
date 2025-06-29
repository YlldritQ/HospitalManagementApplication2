using Microsoft.AspNetCore.Identity;

namespace backend.Core.DbContext
{
    public static class DbSeeder
    {
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            var rolesToSeed = new[]
            {
                "Doctor",
                "Nurse",
                "Admin",
                "Patient",
                "User"
            };

            foreach (var roleName in rolesToSeed)
            {
                var exists = await roleManager.RoleExistsAsync(roleName);
                if (!exists)
                {
                    var result = await roleManager.CreateAsync(new IdentityRole
                    {
                        Name = roleName,
                        NormalizedName = roleName.ToUpper()
                    });

                    if (!result.Succeeded)
                    {
                        throw new Exception(
                            $"Failed to create role {roleName}: " +
                            string.Join("; ", result.Errors.Select(e => e.Description))
                        );
                    }
                }
            }
        }
    }
}
