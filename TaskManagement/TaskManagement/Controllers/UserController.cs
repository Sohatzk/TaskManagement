using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using TaskManagement.Controllers.Base;
using TaskManagement.Service.Users;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Models.User.Out;

namespace TaskManagement.Controllers
{
    [Authorize]
    public class UserController(IUserService userService, IMapper mapper) : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetUsers(CancellationToken cancellationToken)
        {
            var userViews = await userService.GetUsersAsync(cancellationToken);
            return Ok(mapper.Map<List<UserSelectResponse>>(userViews));
        }
    }
}
