using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace AutoSummarize.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class GreetingsController : ControllerBase
  {
    [HttpGet]
    public IActionResult GetHostname()
    {
      string hostname = Dns.GetHostName();
      string message = $"Greetings from DotNet service. Hostname: {hostname}";
      return Ok(new { Message = message });
    }
  }
}