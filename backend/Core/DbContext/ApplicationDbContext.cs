﻿using backend.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace backend.Core.DbContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Log> Logs { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Nurse> Nurses { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        public DbSet<MedicalRecord> MedicalRecords { get; set; }

        public DbSet<Department> Departments { get; set; }


        public DbSet<Room> Rooms { get; set; }

        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<DoctorRoom> DoctorRooms { get; set; }
        public DbSet<NurseRoom> NurseRooms { get; set; }

        public DbSet<Notification> Notifications { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //config 

            //Mapping the identity Entities to tables in the db
            //1
            builder.Entity<ApplicationUser>(e =>
            {
                e.ToTable("Users");
            });
            //2
            builder.Entity<IdentityUserClaim<string>>(e =>
            {
                e.ToTable("UserClaims");
            });
            //3
            builder.Entity<IdentityUserLogin<string>>(e =>
            {
                e.ToTable("UserLogins");
            });
            //4
            builder.Entity<IdentityUserToken<string>>(e =>
            {
                e.ToTable("UserTokens");
            });
            //5
            builder.Entity<IdentityRole>(e =>
            {
                e.ToTable("Roles");
            });
            //6
            builder.Entity<IdentityRoleClaim<string>>(e =>
            {
                e.ToTable("RoleClaims");
            });
            //7
            builder.Entity<IdentityUserRole<string>>(e =>
            {
                e.ToTable("UserRoles");
            });
            // One-to-one relationship between ApplicationUser and Patient
            builder.Entity<ApplicationUser>()
                .HasOne(a => a.Patient)
                .WithOne(p => p.User)
                .HasForeignKey<Patient>(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // One-to-one relationship between ApplicationUser and Doctor
            builder.Entity<ApplicationUser>()
                .HasOne(a => a.Doctor)
                .WithOne(d => d.User)
                .HasForeignKey<Doctor>(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // One-to-one relationship between ApplicationUser and Nurse
            builder.Entity<ApplicationUser>()
                .HasOne(a => a.Nurse)
                .WithOne(n => n.User)
                .HasForeignKey<Nurse>(n => n.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Doctor>()
                .HasOne(d => d.Department)
                .WithMany(dept => dept.Doctors)
                .HasForeignKey(d => d.DepartmentId)
                .IsRequired(false);

            // Department - Nurse (One-to-Many)
            builder.Entity<Nurse>()
                .HasOne(n => n.Department)
                .WithMany(dept => dept.Nurses)
                .HasForeignKey(n => n.DepartmentId)
                .IsRequired(false);

            // Doctor - Appointment (One-to-Many)
            builder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId);

            // Patient - Appointment (One-to-Many)
            builder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany(p => p.Appointments)
                .HasForeignKey(a => a.PatientId);

            // Doctor - Prescription (One-to-Many)
            builder.Entity<Prescription>()
                .HasOne(p => p.Doctor)
                .WithMany(d => d.Prescriptions)
                .HasForeignKey(p => p.DoctorId);

            // Patient - Prescription (One-to-Many)
            builder.Entity<Prescription>()
                .HasOne(p => p.Patient)
                .WithMany(pat => pat.Prescriptions)
                .HasForeignKey(p => p.PatientId);

            // Patient - MedicalRecord (One-to-Many)
            builder.Entity<MedicalRecord>()
                .HasOne(mr => mr.Patient)
                .WithMany(p => p.MedicalRecords)
                .HasForeignKey(mr => mr.PatientId);

            // MedicalRecord - Doctor (Many-to-One, optional)
            builder.Entity<MedicalRecord>()
                .HasOne(mr => mr.Doctor)
                .WithMany(d => d.MedicalRecords)
                .HasForeignKey(mr => mr.DoctorId)
                .IsRequired(false);

            // MedicalRecord - Nurse (Many-to-One, optional)
            builder.Entity<MedicalRecord>()
                .HasOne(mr => mr.Nurse)
                .WithMany(n => n.MedicalRecords)
                .HasForeignKey(mr => mr.NurseId)
                .IsRequired(false);

            // MedicalRecord - Prescription (One-to-One, optional)
            builder.Entity<MedicalRecord>()
                .HasOne(mr => mr.Prescription)
                .WithOne(p => p.MedicalRecord)
                .HasForeignKey<MedicalRecord>(mr => mr.PrescriptionId)
                .IsRequired(false);

            // Room - Appointment (Optional Many-to-One)
            builder.Entity<Appointment>()
                .HasOne(a => a.Room)
                .WithMany(r => r.Appointments)
                .HasForeignKey(a => a.RoomId)
                .IsRequired(false);

            // Department - Room (One-to-Many)
            builder.Entity<Room>()
                .HasOne(r => r.Department)
                .WithMany(d => d.Rooms)
                .HasForeignKey(r => r.DepartmentId)
                .IsRequired(false);

            // Many-to-Many relationships (Doctor - Room, Nurse - Room)
            builder.Entity<DoctorRoom>()
                .HasKey(dr => new { dr.DoctorId, dr.RoomId });

            builder.Entity<DoctorRoom>()
                .HasOne(dr => dr.Doctor)
                .WithMany(d => d.DoctorRooms)
                .HasForeignKey(dr => dr.DoctorId);

            builder.Entity<DoctorRoom>()
                .HasOne(dr => dr.Room)
                .WithMany(r => r.DoctorRooms)
                .HasForeignKey(dr => dr.RoomId);

            builder.Entity<NurseRoom>()
                .HasKey(nr => new { nr.NurseId, nr.RoomId });

            builder.Entity<NurseRoom>()
                .HasOne(nr => nr.Nurse)
                .WithMany(n => n.NurseRooms)
                .HasForeignKey(nr => nr.NurseId);

            builder.Entity<NurseRoom>()
                .HasOne(nr => nr.Room)
                .WithMany(r => r.NurseRooms)
                .HasForeignKey(nr => nr.RoomId);

            builder.Entity<Notification>()
       .HasOne(n => n.User)
       .WithMany(u => u.Notifications)
       .HasForeignKey(n => n.UserId)
       .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
