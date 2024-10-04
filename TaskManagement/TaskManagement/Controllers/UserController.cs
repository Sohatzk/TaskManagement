using Microsoft.AspNetCore.Mvc;
using TaskManagement.Controllers.Base;
using TaskManagement.Service.Users;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserView>>> GetUsers()
        {
            return await _userService.GetUsersAsync();
        }
    }
}
