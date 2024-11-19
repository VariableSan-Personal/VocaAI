using AutoSummarize.Models;
using AutoSummarize.Services;
using Microsoft.AspNetCore.Mvc;

namespace AutoSummarize.Controllers
{
  [ApiController, Route("api/[controller]")]
  public class ExampleController : ControllerBase
  {
    private readonly ExampleService exampleService;

    public ExampleController(ExampleService exampleService)
    {
      this.exampleService = exampleService;
    }

    [HttpGet("{id}")]
    public ActionResult<ExampleModel> GetExample(int id)
    {
      var example = exampleService.GetExample(id);
      if (example == null)
      {
        return NotFound();
      }
      return Ok(example);
    }

    [HttpPost]
    public ActionResult<ExampleModel> PostExample([FromBody] ExampleModel exampleModel)
    {
      if (exampleModel == null)
      {
        return BadRequest();
      }

      var createdExample = exampleService.SaveExample(exampleModel);
      return CreatedAtAction(nameof(GetExample), new { id = createdExample.Id }, createdExample);
    }

    [HttpGet("test")]
    public ActionResult<ExampleModel> GetTest([FromQuery] int id)
    {
      var example = exampleService.GetExample(id);
      if (example == null)
      {
        return NotFound();
      }
      return Ok(example);
    }
  }
}
