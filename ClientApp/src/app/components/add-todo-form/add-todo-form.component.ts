import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/Todo';


@Component({
    selector: 'app-add-todo-form',
    templateUrl: './add-todo-form.component.html',
    styleUrls: ['./add-todo-form.component.css']
})
export class AddTodoFormComponent implements OnInit {
    @Output() onAddTodo: EventEmitter<Todo> = new EventEmitter();
    todo_text: string = "";
    // TODO: convert into a calendar
    // and post the new TODO in a format that works with
    // saving dates to the MYSQL database
    day_date: string = "";
    reminder: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }



}
