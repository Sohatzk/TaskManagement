using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Storage;
using TaskManagement.Storage.Entities;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public class UserService(TaskManagementContext db, IMapper mapper) : IUserService
    {
        private readonly TaskManagementContext _db = db;
        private readonly IMapper _mapper = mapper;

        public async Task<UserView> GetUserAsync(string email)
        {
            return await _db.Users
                .Where(u => u.Email == email)
                .Select(u => new UserView
                {
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    PasswordHash = u.PasswordHash,
                    PasswordSalt = u.PasswordSalt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await _db.Users
                .AnyAsync(u => u.Email == email);
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

        public async Task<UserView> CreateAsync(UserDescriptor descriptor)
        {
            var user = _mapper.Map<User>(descriptor);
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return _mapper.Map<UserView>(user);
        }
    }
}
