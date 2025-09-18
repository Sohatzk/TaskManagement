using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.Controllers.Base;
using TaskManagement.Infrastructure;
using TaskManagement.Models.Auth.In;
using TaskManagement.Models.Auth.Out;
using TaskManagement.Service.Users;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Controllers
{
    public class AuthController(
        IUserService userService,
        IPasswordHasher passwordHasher) : BaseController
    {
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var userExists = await userService.UserExistsAsync(model.Email);
            if (userExists)
            {
                return BadRequest("User with such email already exists");
            }

            var (hash, salt) = passwordHasher.Hash(model.Password);

            var userDescriptor = new UserDescriptor
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            var userView = await userService.CreateAsync(userDescriptor);

            await SignInAsync(userView, model.RememberMe);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var userView = await userService.GetUserAsync(model.Email);
            if (userView is null)
            {
                return Unauthorized("User with this email was not found");
            }

            var isVerified = passwordHasher.Verify(model.Password, userView.PasswordHash, userView.PasswordSalt);

            if (!isVerified)
            {
                return Unauthorized("Invalid Password");
            }

            await SignInAsync(userView, model.RememberMe);

            return Ok();
        }

        private async Task SignInAsync(UserGridView userGrid, bool isPersistant)
        {
            var claims = new Claim[]
            {
                new("FistName", userGrid.FirstName),
                new("LastName", userGrid.LastName),
                new(ClaimTypes.Email, userGrid.Email),
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties
                {
                    IsPersistent = isPersistant
                });
        }

        [Authorize]
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }

        [AllowAnonymous]
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
