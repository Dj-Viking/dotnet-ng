using Microsoft.AspNetCore.Mvc;

namespace dotnet_ng.Controllers;
using MySql.Data.MySqlClient;
using dotnet_ng.Connection;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    MySqlConnection connection = new ConnectionClass().connection;
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
    public IEnumerable<WeatherForecast> Get()
    {
        // try
        // {
        //     connection.Open();
        //     Console.WriteLine("what is happening now {0}", connection);


        // }
        // catch (Exception e)
        // {
        //     Console.WriteLine("error occurred during db connection {0}", e);
        // }

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
