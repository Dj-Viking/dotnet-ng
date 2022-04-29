using Microsoft.AspNetCore.Mvc;

namespace dotnet_ng.Controllers;
using MySql.Data.MySqlClient;
using dotnet_ng.Connection;

[ApiController]
[Route("/weatherforecast")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public dynamic Get()
    {
        try
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
        catch (Exception e)
        {
            Console.WriteLine("there was an error during getting the weather forecast {0}", e);
            return BadRequest(new JsonResult(new { message = "OH NO", status = 500 }));
        }

    }
}
