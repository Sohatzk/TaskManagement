using Microsoft.EntityFrameworkCore;
using TaskManagement.Storage.Entities;
using TaskManagement.Storage.Mappings;

namespace TaskManagement.Storage
{
    public class TaskManagementContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public TaskManagementContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Add the Postgres Extension for UUID generation
            modelBuilder.HasPostgresExtension("uuid-ossp");

            // define configurations
            modelBuilder.ApplyConfiguration(new UserMapping());
        }
    }
}
