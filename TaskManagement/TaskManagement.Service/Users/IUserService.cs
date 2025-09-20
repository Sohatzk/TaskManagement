using System.Runtime.InteropServices;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public interface IUserService
    {
        Task<List<UserGridView>> GetUsersAsync();
        Task<UserAuthView> GetUserAuthViewAsync(string email);
        Task<bool> UserExistsAsync(string email);
        Task<UserAuthView> CreateAsync(UserDescriptor descriptor);
    }
}
