using TaskManagement.Infrastructure.Middlewares;

namespace TaskManagement.Infrastructure.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseUserInformationMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UserInformationMiddleware>();
        }
    }
}
