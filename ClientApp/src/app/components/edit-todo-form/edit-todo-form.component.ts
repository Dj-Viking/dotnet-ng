import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { UiService } from 'src/app/services/ui.service';
import { EditTodoResponse, Todo } from 'src/interfaces';

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
    public showEditTodo: boolean = false;
    public editTodoSub!: Subscription;
    public editTodoContextSub!: Subscription;

    constructor(
        private uiService: UiService,
        private todoService: TodoService
    ) {
        this.editTodoSub = this.uiService
            .onToggleEdit()
            .subscribe(value => {
                this.showEditTodo = value;
            });
        this.editTodoContextSub = this.uiService
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
        this.todoService
            .editTodo(edited)
            .subscribe(
                (success: EditTodoResponse) => {
                    if (success.status === 200) {
                        //do this on success
                        this.onEditTodo.emit(edited);
                        this.editTodoSub = this.uiService
                            .closeEditTodo()
                            .subscribe((todo) => {
                                this.id = todo.id as number;
                                this.todo_text = todo.todo_text as string;
                                this.due_date = todo.due_date as string;
                                this.reminder = todo.reminder as boolean;
                            });
                    }
                },
                (error: EditTodoResponse) => {
                    //TODO: if errored don't clear
                    console.log("error during submit edit", error);
                });


    }

}
