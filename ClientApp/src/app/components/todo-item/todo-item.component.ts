import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUpdateTodoReminderResponse, Todo } from 'src/interfaces';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
    @Input() todo!: Todo
    @Output() onDeleteTodo: EventEmitter<Todo> = new EventEmitter();
    @Output() onOpenEditTodo: EventEmitter<Todo> = new EventEmitter();
    @Output() onToggleReminder: EventEmitter<Todo> = new EventEmitter();
    public faTimes = faTimes;
    public faPencil = faPencil;
    constructor(private _todoService: TodoService) { }

    public ngOnInit(): void {
    }

    public onReminderToggle(todo: Todo): void {
        this._todoService
            .updateTodoReminder(todo)
            .subscribe(
                (_success: IUpdateTodoReminderResponse) => {
                    this.onToggleReminder.emit(todo);
                },
                (error: IUpdateTodoReminderResponse) => {
                    console.log('error', error);
                    //TODO: toast notifications for errors
                }
            );
    }

    public onDelete(todo: Todo): void {
        this.onDeleteTodo.emit(todo);
    }

    public onOpenEdit(todo: Todo): void {
        this.onOpenEditTodo.emit(todo);
    }

}
