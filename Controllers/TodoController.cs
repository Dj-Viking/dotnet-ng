using Microsoft.AspNetCore.Mvc;

namespace dotnet_ng.Controllers;
using MySql.Data.MySqlClient;
using dotnet_ng.Connection;

[ApiController]
[Route("/todos")]
public class TodoController : ControllerBase
{
    private MySqlConnection connection = new ConnectionClass().connection;

    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public void Post([FromBody] Todo todo)
    {
        try
        {
            Console.WriteLine("heres the todo from the body {0}", todo);
        }
        catch (Exception e)
        {
            Console.WriteLine("error occured during todo post request {0}", e);
        }
    }

    // [HttpGet]
    // public IEnumerable<Todo> Get()
    // {
    //     // try
    //     // {
    //     //     connection.Open();
    //     //     Console.WriteLine("what is happening now {0}", connection);


    //     // }
    //     // catch (Exception e)
    //     // {
    //     //     Console.WriteLine("error occurred during db connection {0}", e);
    //     // }

    // }
}
