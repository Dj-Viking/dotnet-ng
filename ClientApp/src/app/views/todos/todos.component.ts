import { Component, OnInit } from '@angular/core';
import { Todo } from "src/Todo";
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

    addTodo(todo: Todo): void {
        this.todoService
            .addTodo(todo)
            .subscribe((t) => {
                console.log("todo", t);
                this.todos.push(todo);
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
