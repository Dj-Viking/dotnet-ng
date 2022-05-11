import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { UiService } from 'src/app/services/ui.service';
import { IEditTodoResponse, Todo } from 'src/interfaces';

@Component({
    selector: 'app-edit-todo-form',
    templateUrl: './edit-todo-form.component.html',
    styleUrls: ['./edit-todo-form.component.css']
})
export class EditTodoFormComponent implements OnInit, OnDestroy {
    @Output() onEditTodo: EventEmitter<Todo> = new EventEmitter();
    public id: number = 0;
    public todo_text: string = "";
    public due_date: string = "";
    public reminder: boolean = false;
    public errorMsg: string = "";
    public showError: boolean = false;
    public showEditTodo: boolean = false;
    public showErrorSub!: Subscription;
    public editTodoSub!: Subscription;
    public editTodoContextSub!: Subscription;

    constructor(
        private _uiService: UiService,
        private _todoService: TodoService
    ) {
        this.showErrorSub = this._uiService
            .onToggleShowEditError()
            .subscribe(value => {
                this.showError = value;
            });

        this.editTodoSub = this._uiService
            .onToggleEdit()
            .subscribe(value => {
                this.showEditTodo = value;
            });

        this.editTodoContextSub = this._uiService
            .onEditContext()
            .subscribe(todo => {
                this.id = todo.id as number;
                this.todo_text = todo.todo_text as string;
                this.due_date = todo.due_date as string;
                this.reminder = todo.reminder as boolean;
            });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.editTodoSub.unsubscribe();
        this.editTodoContextSub.unsubscribe();
        this.showErrorSub.unsubscribe();
    }

    onSubmit(): void {
        console.log("submitted the edited todo")
        const edited = {
            id: this.id,
            todo_text: this.todo_text,
            due_date: this.due_date,
            reminder: this.reminder
        }

        //hmm if i want to handle not clearing after submit
        // maybe only emit the event with the newly edited
        // todo so that the parent can then handle the list
        this._todoService
            .editTodo(edited)
            .subscribe(
                (success: IEditTodoResponse) => {
                    if (success.status === 200) {
                        //do this on success
                        this.onEditTodo.emit(edited);
                        this.editTodoSub = this._uiService
                            .closeEditTodo()
                            .subscribe((empty) => {
                                this.id = empty.id as number;
                                this.todo_text = empty.todo_text as string;
                                this.due_date = empty.due_date as string;
                                this.reminder = empty.reminder as boolean;
                            });
                    }
                },
                (error: IEditTodoResponse) => {
                    //TODO: if errored don't clear
                    console.log("error during submit edit", error);
                    this.errorMsg = "We're sorry there was a problem with this request.";
                    this._uiService.toggleShowEditError();
                    setTimeout(() => {
                        this._uiService.toggleShowEditError();
                    }, 2000);
                });


    }

}
