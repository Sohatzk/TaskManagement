using Microsoft.EntityFrameworkCore;
using TaskManagement.Storage.Entities;

namespace TaskManagement.Storage
{
    public class TaskManagementContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public TaskManagementContext(DbContextOptions options) : base(options) { }
    }
}
