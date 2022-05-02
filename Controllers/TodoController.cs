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

    // todos
    [HttpPost]
    public dynamic AddTodo([FromBody] Todo todo)
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

                string insert = $@"
                    INSERT INTO 
                        todos (todo_text, due_date, reminder) 
                    VALUES(
                        '{todo.todo_text}', '{todo.due_date}', {todo.reminder});";

                string select = @"SELECT LAST_INSERT_ID();";

                db.Execute(insert, null);

                int inserted = db.QuerySingle<int>(select, null);

                return Ok(new { status = 200, id = inserted });
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("error occured during todo post request {0}", e);

            return BadRequest(new { message = "OH NO", status = 500 });
        }
    }

    // todos
    [HttpGet]
    public dynamic GetTodos()
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

            return BadRequest(new { message = "OH NO", status = 500 });
        }
    }

    // todos/:id
    [HttpDelete("{id}")]
    public dynamic DeleteTodo([FromRoute] int id)
    {
        try
        {
            using (IDbConnection db = new MySqlConnection(new ConnectionClass().connection_string))
            {
                string query = $"DELETE FROM todos WHERE id = {id}";

                db.Execute(query, null);

                return Ok();
            }
        }
        catch (Exception e)
        {

            Console.WriteLine("error occured during todo post request {0}", e);

            return BadRequest(new { message = "OH NO", status = 500 });
        }
    }

    [HttpPut]
    [Route("/todos-edit/{id}")]
    public dynamic Edit([FromBody] Todo todo, [FromRoute] int id)
    {
        try
        {
            using (IDbConnection db = new MySqlConnection(new ConnectionClass().connection_string))
            {

                string update = $@"
                    UPDATE 
                        todos
                    SET 
                        todo_text = '{todo.todo_text}', 
                        due_date = '{todo.due_date}', 
                        reminder = {todo.reminder}
                    WHERE 
                        id = {id};";

                int rowsAffected = db.Execute(update, null);

                return Ok(new { status = 200 });
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("error occured during todo post request {0}", e);

            return BadRequest(new { message = "OH NO", status = 500 });
        }
    }
}
