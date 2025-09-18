using TaskManagement.Service.Users;
using TaskManagement.Service.WorkItems;

namespace TaskManagement.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(
        this IServiceCollection serviceCollection)
    {
        serviceCollection.AddSingleton<IPasswordHasher, PasswordHasher>();
        serviceCollection.AddScoped<IUserService, UserService>();
        serviceCollection.AddScoped<IWorkItemService, WorkItemService>();

        return serviceCollection;
    }
}