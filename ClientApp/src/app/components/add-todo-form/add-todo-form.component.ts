import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/interfaces';
import { UiService } from 'src/app/services/ui.service';

@Component({
    selector: 'app-add-todo-form',
    templateUrl: './add-todo-form.component.html',
    styleUrls: ['./add-todo-form.component.css']
})
// TODO: convert due_date into a calendar which outputs a date string that can be 
// applied to a DateTime type on the backend server
// and post the new TODO in a format that works with
// saving dates to the MYSQL database
export class AddTodoFormComponent implements OnInit, OnDestroy {
    @Output() onAddTodo: EventEmitter<Todo> = new EventEmitter();
    public todo_text: string = "";
    public due_date: string = "";
    public reminder: boolean = false;
    public showAddTodo!: boolean;
    public subscription!: Subscription;

    constructor(private uiService: UiService) {
        this.subscription = this.uiService
            .onToggle()
            .subscribe(value => {
                this.showAddTodo = value;
            });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(): void {
        const todo = {
            todo_text: this.todo_text,
            due_date: this.due_date,
            reminder: this.reminder
        };
        console.log("todo here", todo);

        //emit the todo object to the parent element which handles
        // rendering new todo elements 
        this.onAddTodo.emit(todo);

        //clear the form
        this.todo_text = "";
        this.due_date = "";
        this.reminder = false;
    }


}
