import { Component, OnInit } from '@angular/core';
import { Todo } from "src/interfaces";
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
        private _todoService: TodoService,
        private _uiService: UiService
    ) { }

    public ngOnInit(): void {
        this._todoService
            .getTodos()
            .subscribe(todos => {
                this.todos = todos;
            });
    }

    public addTodo(todo: Todo): void {
        this.todos.push(todo);
    }

    public editTodo(todo: Todo): void {

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

    public openEditTodo(todo: Todo): void {
        console.log("open edit todo", todo);
        this._uiService.toggleEditTodo(todo);
    }

    public deleteTodo(todo: Todo): void {
        this._todoService
            .deleteTodo(todo)
            .subscribe(() => {
                this.todos = this.todos.filter(t => {
                    return t.id !== todo.id
                });
            });
    }

    public toggleReminder(todo: Todo): void {
        todo.reminder = !todo.reminder;
        this._todoService
            .updateTodoReminder(todo)
            .subscribe();
    }

}
