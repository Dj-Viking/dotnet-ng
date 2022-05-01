import { Component, OnInit } from '@angular/core';
import { Todo, AddTodoResponse, EditTodoResponse } from "src/interfaces";
import { TodoService } from 'src/app/services/todo.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
    public todos: Todo[] = [];
    constructor(
        private todoService: TodoService,
        private uiService: UiService
    ) { }

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

        //only getting a todo if the child element was successful
        // with the PUT request to the API and did not error

        // handle splicing the old todo out and replacing it
        // with the new todo
        this.todos = this.todos.map(t => {
            if (t.id === todo.id) {
                return todo;
            } else {
                return t;
            }
        });
    }

    openEditTodo(todo: Todo): void {
        console.log("open edit todo", todo);
        this.uiService.toggleEditTodo(todo);
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
