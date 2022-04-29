using Microsoft.AspNetCore.Mvc;
namespace dotnet_ng.Controllers;
using System.Data;
using MySql.Data.MySqlClient;
using Dapper;
using dotnet_ng.Connection;

[ApiController]
[Route("/todos")]
public class TodoController : ControllerBase
{

    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger)
    {
        _logger = logger;
    }

    [HttpPost]
    public dynamic Post([FromBody] Todo todo)
    {
        try
        {
            using (IDbConnection db = new MySqlConnection(new ConnectionClass().connection_string))
            {
                Todo newTodo = new Todo()
                {
                    todo_text = todo.todo_text,
                    due_date = todo.due_date,
                    reminder = todo.reminder
                };

                string sqlQuery = "INSERT INTO todos (todo_text, due_date, reminder) VALUES(@todo_text, @due_date, @reminder)";

                int rowsAffected = db.Execute(sqlQuery, newTodo);
            }
            return Ok(new JsonResult(new { Status = 200 }));
        }
        catch (Exception e)
        {
            Console.WriteLine("error occured during todo post request {0}", e);
            return BadRequest(new JsonResult(new { Message = "OH NO", Status = 500 }));
        }
    }

    [HttpGet]
    public dynamic Get()
    {
        try
        {
            using (IDbConnection db = new MySqlConnection(new ConnectionClass().connection_string))
            {
                string query = "SELECT * FROM todos";

                IEnumerable<Todo> todos = db.Query<Todo>(query);

                return Ok(todos.ToArray());
            }
        }
        catch (Exception e)
        {

            Console.WriteLine("error occured during todo post request {0}", e);
            return BadRequest(new JsonResult(new { message = "OH NO", status = 500 }));
        }
    }
}
