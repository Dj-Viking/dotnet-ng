import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddTodoResponse, EditTodoResponse, Todo } from 'src/interfaces';

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

    addTodo(todo: Todo): Observable<AddTodoResponse> {
        return this.http.post<AddTodoResponse>(
            `${this.baseUrl}todos`,
            todo,
            this.httpOptions);
    }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.baseUrl}todos`);
    }

    updateTodoReminder(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(
            `${this.baseUrl}todos-reminder/${todo.id}`,
            todo,
            this.httpOptions);
    }

    editTodo(todo: Todo): Observable<EditTodoResponse> {
        return this.http.put<EditTodoResponse>(
            `${this.baseUrl}todos/edit/${todo.id}`,
            todo,
            this.httpOptions);
    }

    deleteTodo(todo: Todo): Observable<Todo> {
        return this.http.delete<Todo>(
            `${this.baseUrl}todos/${todo.id}`)
    }

}
