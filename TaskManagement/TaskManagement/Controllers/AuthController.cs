using Microsoft.AspNetCore.Mvc;

namespace TaskManagement.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;

        public AuthController(ILogger<AuthController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Users")]
        public IActionResult Get()
        {
            return Ok();
        }
    }
}
