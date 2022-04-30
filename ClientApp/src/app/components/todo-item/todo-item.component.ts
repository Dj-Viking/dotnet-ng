import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/interfaces';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

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
    constructor() { }

    ngOnInit(): void {
    }

    onToggle(todo: Todo): void {
        this.onToggleReminder.emit(todo);
    }

    onDelete(todo: Todo): void {
        this.onDeleteTodo.emit(todo);
    }

    onOpenEdit(todo: Todo): void {
        this.onOpenEditTodo.emit(todo);
    }

}
