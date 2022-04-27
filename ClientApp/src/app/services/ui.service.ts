import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private showAddTodo: boolean = false;
    private subject = new Subject<boolean>();

    constructor() { }

    toggleAddTodo(): void {
        this.showAddTodo = !this.showAddTodo;
        this.subject.next(this.showAddTodo);
    }

    onToggle(): Observable<boolean> {
        return this.subject.asObservable();
    }
}
