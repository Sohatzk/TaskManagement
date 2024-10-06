using System.Runtime.InteropServices;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public interface IUserService
    {
        Task<List<UserView>> GetUsersAsync();
        Task<UserView> GetUserAsync(string email, string password);
    }
}
