import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from 'src/interfaces';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private _showAddTodo: boolean = false;
    private _showEditTodo: boolean = false;
    private _todoContext!: Todo;
    private _showEditError: boolean = false;
    private _showEditErrorSubject = new Subject<boolean>();
    private _showAddError: boolean = false;
    private _showAddErrorSubject = new Subject<boolean>();
    private _addTodoSubject = new Subject<boolean>();
    private _editTodoSubject = new Subject<boolean>();
    private _todoContextSubject = new Subject<Todo>();

    constructor() { }



    public toggleShowAddError(): void {
        this._showAddError = !this._showAddError;
        this._showAddErrorSubject.next(this._showAddError);
    }

    public onToggleShowAddError(): Observable<boolean> {
        return this._showAddErrorSubject.asObservable();
    }

    public toggleShowEditError(): void {
        this._showEditError = !this._showEditError;
        this._showEditErrorSubject.next(this._showEditError);
    }

    public onToggleShowEditError(): Observable<boolean> {
        return this._showEditErrorSubject.asObservable();
    }

    public toggleAddTodo(): void {
        this._showAddTodo = !this._showAddTodo;
        this._showEditTodo = this._showAddTodo && !this._showEditTodo ? false : false;
        this._addTodoSubject.next(this._showAddTodo);
        this._editTodoSubject.next(this._showEditTodo);
    }

    public onToggle(): Observable<boolean> {
        return this._addTodoSubject.asObservable();
    }

    public toggleEditTodo(todo: Todo): void {
        console.log("toggle edit form");
        this._showEditTodo = !this._showEditTodo
        this._showAddTodo = false;
        this._todoContext = todo;
        this._todoContextSubject.next(this._todoContext);
        this._addTodoSubject.next(this._showAddTodo);
        this._editTodoSubject.next(this._showEditTodo);
    }

    public closeEditTodo(): Observable<Todo> {
        this._todoContext = {
            id: 0,
            todo_text: "",
            due_date: "",
            reminder: false,
        };
        this._todoContextSubject.next(this._todoContext);
        this._showEditTodo = !this._showEditTodo;
        this._editTodoSubject.next(this._showEditTodo);
        return this._todoContextSubject.asObservable();
    }

    public onToggleEdit(): Observable<boolean> {
        return this._editTodoSubject.asObservable();
    }

    public onEditContext(): Observable<Todo> {
        return this._todoContextSubject.asObservable();
    }
}
