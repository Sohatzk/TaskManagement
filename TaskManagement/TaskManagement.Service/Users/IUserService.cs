using System.Runtime.InteropServices;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public interface IUserService
    {
        Task<List<UserView>> GetUsersAsync();
        Task<UserView> GetUserAsync(string email);
        Task<bool> UserExistsAsync(string email);
        Task<UserView> CreateAsync(UserDescriptor descriptor);
    }
}
