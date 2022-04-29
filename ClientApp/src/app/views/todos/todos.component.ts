import { Component, OnInit } from '@angular/core';
import { Todo, AddTodoResponse } from "src/interfaces";
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
    public todos: Todo[] = [];
    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
        this.todoService
            .getTodos()
            .subscribe(todos => {
                this.todos = todos;
            });
    }

    // SQL insert statement executions only output a number of rows affected and not an entire object
    // have to perform a separate query to get the last inserted ID and set it to the object here
    // before pushing into the todo array.
    addTodo(todo: Todo): void {
        this.todoService
            .addTodo(todo)
            .subscribe((res: AddTodoResponse) => {
                todo.id = res.id;
                this.todos.push(todo);
            });
    }

    editTodo(todo: Todo): void {
        this.todoService
            .editTodo(todo)
            .subscribe(todo => {
                console.log("edited todo", todo);
                //TODO: replace the todo at the index of the original todo in the todos array
            });
    }

    deleteTodo(todo: Todo): void {
        this.todoService
            .deleteTodo(todo)
            .subscribe(() => {
                this.todos = this.todos.filter(t => {
                    return t.id !== todo.id
                });
            });
    }

    toggleReminder(todo: Todo): void {
        todo.reminder = !todo.reminder;
        this.todoService
            .updateTodoReminder(todo)
            .subscribe();
    }

}
