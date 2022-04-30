import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from 'src/interfaces';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private showAddTodo: boolean = false;
    private showEditTodo: boolean = false;
    private todoContext!: Todo;
    private addTodoSubject = new Subject<boolean>();
    private editTodoSubject = new Subject<boolean>();
    private todoContextSubject = new Subject<Todo>();

    constructor() { }

    toggleAddTodo(): void {
        this.showAddTodo = !this.showAddTodo;
        this.showEditTodo = this.showAddTodo && !this.showEditTodo ? false : false;
        this.addTodoSubject.next(this.showAddTodo);
        this.editTodoSubject.next(this.showEditTodo);
    }

    onToggle(): Observable<boolean> {
        return this.addTodoSubject.asObservable();
    }

    toggleEditTodo(todo: Todo): void {
        console.log("toggle edit form");
        this.showEditTodo = !this.showEditTodo
        this.showAddTodo = false;
        this.todoContext = todo;
        this.todoContextSubject.next(this.todoContext);
        this.addTodoSubject.next(this.showAddTodo);
        this.editTodoSubject.next(this.showEditTodo);
    }

    closeEditTodo(): Observable<Todo> {
        this.todoContext = {
            id: 0,
            todo_text: "",
            due_date: "",
            reminder: false,
        };
        this.todoContextSubject.next(this.todoContext);
        return this.todoContextSubject.asObservable();
    }

    onToggleEdit(): Observable<boolean> {
        return this.editTodoSubject.asObservable();
    }

    onEditContext(): Observable<Todo> {
        return this.todoContextSubject.asObservable();
    }
}
