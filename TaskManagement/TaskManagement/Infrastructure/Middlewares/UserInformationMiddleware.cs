using System.Text;

namespace TaskManagement.Infrastructure.Middlewares
{
    public class UserInformationMiddleware
    {
        private readonly RequestDelegate _next;

        public UserInformationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                var userClaims = context.User.Claims;
                var stringClaims = string.Join(";", userClaims);
                var stringClaimsBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(stringClaims));
                context.Response.Cookies.Append("user-info", stringClaimsBase64);
            }

            await _next(context);
        }
    }
}
