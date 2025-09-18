using System.Runtime.InteropServices;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public interface IUserService
    {
        Task<List<UserGridView>> GetUsersAsync();
        Task<UserGridView> GetUserAsync(string email);
        Task<bool> UserExistsAsync(string email);
        Task<UserGridView> CreateAsync(UserDescriptor descriptor);
    }
}
