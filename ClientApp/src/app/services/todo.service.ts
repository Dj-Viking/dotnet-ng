import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from 'src/Todo';

interface MyHttpOptions {
    headers: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private baseUrl!: string;
    private httpOptions: MyHttpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    };
    constructor(private http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(
            `${this.baseUrl}todos`, todo, this.httpOptions);
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.baseUrl}todos`);
    }

    updateTodoReminder(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(
            `${this.baseUrl}todos/${todo.id}`, this.httpOptions);
    }

    deleteTodo(todo: Todo): Observable<Todo> {
        return this.http.delete<Todo>(
            `${this.baseUrl}todos/${todo.id}`)
    }

}
