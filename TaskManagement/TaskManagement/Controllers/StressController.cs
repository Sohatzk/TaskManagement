using Microsoft.AspNetCore.Mvc;
using TaskManagement.Controllers.Base;

namespace TaskManagement.Controllers
{
    public class StressController : BaseController
    {
        [HttpGet]
        public IActionResult Stress(int seconds = 60)
        {
            // Task.Run kicks off the work on a background thread immediately
            _ = Task.Run(() => RunMathStress(seconds));

            return Ok(new { message = $"Stress test started for {seconds} seconds on a background thread." });
        }

        private void RunMathStress(int seconds)
        {
            DateTime endTime = DateTime.UtcNow.AddSeconds(seconds);
            double x = 0.0001;

            while (DateTime.UtcNow < endTime)
            {
                // The math logic provided
                x = Math.Pow(Math.Sqrt(x), 2) + Math.Sin(x);

                // Prevention against x becoming Infinity/NaN which slows down the CPU stress
                if (double.IsInfinity(x) || double.IsNaN(x))
                {
                    x = 0.0001;
                }
            }
        }
    }
}