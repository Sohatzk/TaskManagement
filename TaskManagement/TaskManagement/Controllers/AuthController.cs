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
        ILogger<AuthController> logger,
        IUserService userService,
        IPasswordHasher passwordHasher) : BaseController
    {
        private readonly ILogger<AuthController> _logger = logger;
        private readonly IUserService _userService = userService;
        private readonly IPasswordHasher _passwordHasher = passwordHasher;

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var userExists = await _userService.UserExistsAsync(model.Email);
            if (userExists)
            {
                return BadRequest("User with such email already exists");
            }

            var (hash, salt) = _passwordHasher.Hash(model.Password);

            var userDescriptor = new UserDescriptor
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            var userView = await _userService.CreateAsync(userDescriptor);

            await SignInAsync(userView);

            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var userView = await _userService.GetUserAsync(model.Email);
            if (userView is null)
            {
                return BadRequest("User not found");
            }

            var isVerified = _passwordHasher.Verify(model.Password, userView.PasswordHash, userView.PasswordSalt);

            if (!isVerified)
            {
                return BadRequest("Invalid Password");
            }

            await SignInAsync(userView);

            return Ok();
        }

        private async Task SignInAsync(UserView user)
        {
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
