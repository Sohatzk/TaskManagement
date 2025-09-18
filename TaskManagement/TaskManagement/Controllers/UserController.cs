using Microsoft.AspNetCore.Authorization;
using TaskManagement.Controllers.Base;
using TaskManagement.Service.Users;
using Microsoft.AspNetCore.Mvc;

namespace TaskManagement.Controllers
{
    [Authorize]
    public class UserController(IUserService userService) : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await userService.GetUsersAsync());
        }
    }
}
