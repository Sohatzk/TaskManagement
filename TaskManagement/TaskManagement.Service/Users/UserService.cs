using Microsoft.EntityFrameworkCore;
using TaskManagement.Storage;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public class UserService(TaskManagementContext db) : IUserService
    {
        private readonly TaskManagementContext _db = db;

        public async Task<UserView> GetUserAsync(string email, string password)
        {
            return await _db.Users
                .Where(u => u.Email == email && u.Password == password)
                .Select(u => new UserView
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email
                })
                .FirstOrDefaultAsync();
        }

        public async Task<List<UserView>> GetUsersAsync()
        {
            return await _db.Users
                .Select(u => new UserView
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email
                })
                .ToListAsync();
        }
    }
}
