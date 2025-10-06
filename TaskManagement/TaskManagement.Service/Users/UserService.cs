using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Service.Users.Views;
using TaskManagement.Storage;
using TaskManagement.Storage.Entities;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public class UserService(TaskManagementContext db, IMapper mapper) : IUserService
    {
        public async Task<UserAuthView> GetUserAuthViewAsync(string email)
        {
            return await db.Users
                .Where(u => u.Email == email)
                .Select(u => new UserAuthView()
                {
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    PasswordHash = u.PasswordHash,
                    PasswordSalt = u.PasswordSalt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            return await db.Users
                .AnyAsync(u => u.Email == email);
        }

        public async Task<List<UserSelectView>> GetUsersAsync(CancellationToken cancellationToken)
        {
            return await db.Users
                .Select(u => new UserSelectView
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName
                })
                .ToListAsync(cancellationToken);
        }

        public async Task<UserAuthView> CreateAsync(UserDescriptor descriptor)
        {
            var user = mapper.Map<User>(descriptor);
            db.Users.Add(user);
            await db.SaveChangesAsync();

            return mapper.Map<UserAuthView>(user);
        }
    }
}
