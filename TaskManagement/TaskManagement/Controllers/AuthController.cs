using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.Controllers.Base;
using TaskManagement.Models.Auth.In;
using TaskManagement.Models.Auth.Out;
using TaskManagement.Service.Users;

namespace TaskManagement.Controllers
{
    public class AuthController(ILogger<AuthController> logger, IUserService userService) : BaseController
    {
        private readonly ILogger<AuthController> _logger = logger;
        private readonly IUserService _userService = userService;

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userService.GetUserAsync(model.Email, model.Password);
            if (user is null)
            {
                return BadRequest("Invalid credentials");
            }

            var claims = new Claim[]
            {
                new("FistName", user.FirstName),
                new("LastName", user.LastName),
                new(ClaimTypes.Email, user.Email),
            };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties
                {
                    IsPersistent = true
                });

            return Ok();
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new AuthenticationProperties
                {
                    IsPersistent = true
                });

            return Ok();
        }

        [Authorize]
        [HttpGet("user")]
        public IActionResult GetUser()
        {
            var userClaims = HttpContext.User.Claims
                .Select(x => new UserClaim(x.Type, x.Value))
                .ToList();
            return Ok(userClaims);
        }
    }
}
