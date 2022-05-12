import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { IDeleteAllResponse } from 'src/interfaces';

@Component({
    selector: 'app-todos-delete-all-button',
    templateUrl: './todos-delete-all-button.component.html',
    styleUrls: ['./todos-delete-all-button.component.css']
})
export class TodosDeleteAllButtonComponent implements OnInit {
    @Input() color!: string;
    @Input() text!: string;
    @Output() onDeleteAll = new EventEmitter<void>();

    constructor(private _todoService: TodoService) { }

    public ngOnInit(): void {
    }

    public deleteAllTodos(): void {
        this.onDeleteAll.emit();
    }

}
