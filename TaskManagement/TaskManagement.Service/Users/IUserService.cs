using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Users
{
    public interface IUserService
    {
        Task<List<UserView>> GetUsersAsync();
    }
}
