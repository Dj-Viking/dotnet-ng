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
    }

    addTodo(todo: Todo): void {
        console.log("kdfjkdjkfjk");

        this.todoService
            .addTodo(todo)
            .subscribe((t) => this.todos.push(t));
    }

}
