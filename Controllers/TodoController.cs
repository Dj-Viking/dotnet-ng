using Microsoft.AspNetCore.Mvc;
namespace dotnet_ng.Controllers;
using System.Data;
using System.Collections.Generic;
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
    public IActionResult AddTodo([FromBody] Todo todo)
    {
        try
        {
            using (IDbConnection db = new ConnectionClass().connection)
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

                // race condition if don't sleep???
                Thread.Sleep(100);
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
    public IActionResult GetTodos()
    {
        try
        {
            using (IDbConnection db = new ConnectionClass().connection)
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
    public IActionResult DeleteTodo([FromRoute] int id)
    {
        try
        {
            using (IDbConnection db = new ConnectionClass().connection)
            {
                string query = $@"
                    DELETE FROM 
                        todos 
                    WHERE 
                        id = {id}";

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

    private static void DeleteItem(int id)
    {
        using (IDbConnection db = new ConnectionClass().connection)
        {
            string query = $@"
                DELETE FROM
                    todos
                WHERE   
                    id = {id};";

            db.Execute(query, null);
        }
    }

    private static dynamic ConcurrentDelete(List<int> ids)
    {
        try
        {
            //split original list into 2 separate lists
            List<int> list1 = new List<int>();
            List<int> list2 = new List<int>();
            int count = ids.Count;

            for (; count > 0; count--)
            {
                int i = count - 1;

                list1.Add(ids[i]);
                ids.RemoveAt(i);

                count--;
                //if ids count was odd number count will be zero here (eventually)
                if (count == 0) break;
                i = count - 1;

                list2.Add(ids[i]);
                ids.RemoveAt(i);
            }

            //create 2 threads
            Thread thread1 = new Thread(() =>
            {
                for (int i = 0; i < list1.Count; i++)
                {
                    DeleteItem(list1[i]);
                }
            });

            Thread thread2 = new Thread(() =>
            {
                for (int i = 0; i < list2.Count; i++)
                {
                    DeleteItem(list2[i]);
                }
            });

            thread1.Start();
            thread2.Start();

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine("error during concurrent delete {0}", e);
            return e;
        }
    }

    [HttpPost]
    [Route("/todos-delete-all")]
    public IActionResult DeleteAll([FromBody] List<int> ids)
    {
        try
        {
            var deleteAllResult = ConcurrentDelete(ids);

            if (deleteAllResult == true)
                return Ok(new { status = 200 });
            else
                throw new Exception("Could not concurrently delete todos with error: {0}", deleteAllResult);
        }
        catch (Exception e)
        {
            Console.WriteLine("error during delete all {0}", e);

            return BadRequest(new { error = "We're sorry there was an error with this request", status = 500 });
        }
    }

    [HttpPut]
    [Route("/todos-reminder/{id}")]
    public IActionResult Reminder([FromBody] bool reminder, [FromRoute] int id)
    {
        try
        {
            using (IDbConnection db = new ConnectionClass().connection)
            {
                string reminderUpdate = $@"
                    UPDATE
                        todos
                    SET
                        reminder = {reminder}
                    WHERE
                        id = {id};";

                int rowsAffected = db.Execute(reminderUpdate, null);

                return Ok(new { status = 200 });
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("error during reminder update {0}", e);

            return BadRequest(new { error = "We're sorry there was a problem with this request", status = 500 });
        }
    }

    [HttpPut]
    [Route("/todos-edit/{id}")]
    public IActionResult Edit([FromBody] Todo todo, [FromRoute] int id)
    {
        try
        {
            using (IDbConnection db = new ConnectionClass().connection)
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
