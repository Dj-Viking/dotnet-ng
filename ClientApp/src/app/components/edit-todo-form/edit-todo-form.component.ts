import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Todo } from 'src/interfaces';

@Component({
    selector: 'app-edit-todo-form',
    templateUrl: './edit-todo-form.component.html',
    styleUrls: ['./edit-todo-form.component.css']
})
export class EditTodoFormComponent implements OnInit {
    @Output() onEditTodo: EventEmitter<Todo> = new EventEmitter();
    public todo_text: string = "";
    public due_date: string = "";
    public reminder: boolean = false;
    public showEditTodo: boolean = false;
    public editTodoSub!: Subscription;

    constructor(private uiService: UiService) {
        this.editTodoSub = this.uiService
            .onToggleEdit()
            .subscribe(value => {
                this.showEditTodo = value;
            });
    }

    ngOnInit(): void {
    }

    editTodo(): void {
        console.log("submit the edited todo!");
    }

}
