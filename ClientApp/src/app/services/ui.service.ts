import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private showAddTodo: boolean = false;
    private showEditTodo: boolean = false;
    private addTodoSubject = new Subject<boolean>();
    private editTodoSubject = new Subject<boolean>();

    constructor() { }

    toggleAddTodo(): void {
        this.showAddTodo = !this.showAddTodo;
        this.addTodoSubject.next(this.showAddTodo);
    }

    onToggle(): Observable<boolean> {
        return this.addTodoSubject.asObservable();
    }

    toggleEditTodo(): void {
        console.log("toggle edit form");
        this.showEditTodo = !this.showEditTodo
        this.showAddTodo = false;
        this.addTodoSubject.next(this.showAddTodo);
        this.editTodoSubject.next(this.showEditTodo);
    }

    onToggleEdit(): Observable<boolean> {
        return this.editTodoSubject.asObservable();
    }
}
