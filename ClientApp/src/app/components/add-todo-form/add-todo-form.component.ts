import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAddTodoResponse, Todo } from 'src/interfaces';
import { UiService } from 'src/app/services/ui.service';
import { TodoService } from 'src/app/services/todo.service';

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
    @Output() onAddTodo = new EventEmitter<void>();
    public todo_text: string = "";
    public due_date: string = "";
    public reminder: boolean = false;
    public errorMsg: string = "";
    public showAddTodo!: boolean;
    public showAddError: boolean = false;
    public showAddErrorSub!: Subscription;
    public addTodoSub!: Subscription;

    constructor(
        private _uiService: UiService,
        private _todoService: TodoService
    ) {
        this.addTodoSub = this._uiService
            .onToggle()
            .subscribe(value => {
                this.showAddTodo = value;
            });

        this.showAddErrorSub = this._uiService
            .onToggleShowAddError()
            .subscribe(value => {
                this.showAddError = value;
            });
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.addTodoSub.unsubscribe();
        this.showAddErrorSub.unsubscribe();
    }

    public onSubmit(): void {
        const todo = {
            id: 0,
            todo_text: this.todo_text,
            due_date: this.due_date,
            reminder: this.reminder
        };

        //emit the todo object to the parent element which handles
        // rendering new todo elements 

        //API CALL HERE
        this._todoService
            .addTodo(todo)
            .subscribe(
                (success: IAddTodoResponse) => {
                    if (success.status === 200) {
                        //close add todo form
                        this._uiService.toggleAddTodo();
                        console.log("todo id after add", success.id);
                        this.onAddTodo.emit();
                        //clear the form
                        this.todo_text = "";
                        this.due_date = "";
                        this.reminder = false;
                    }
                },
                (error: IAddTodoResponse) => {
                    this.errorMsg = "We're sorry there was a problem with this request.";
                    this._uiService.toggleShowAddError();
                    setTimeout(() => {
                        this._uiService.toggleShowAddError();
                    }, 3000);
                }
            );
    }
}
