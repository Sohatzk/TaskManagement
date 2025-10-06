using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Service.Users.Views;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public interface IUserService
    {
        Task<List<UserSelectView>> GetUsersAsync(CancellationToken cancellationToken);
        Task<UserAuthView> GetUserAuthViewAsync(string email);
        Task<bool> UserExistsAsync(string email);
        Task<UserAuthView> CreateAsync(UserDescriptor descriptor);
    }
}
