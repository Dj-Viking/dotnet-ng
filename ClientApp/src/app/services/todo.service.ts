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
    private _baseUrl!: string;
    private _httpOptions: MyHttpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    };
    constructor(private _http: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public addTodo(todo: Todo): Observable<AddTodoResponse> {
        return this._http.post<AddTodoResponse>(
            `${this._baseUrl}todos`,
            todo,
            this._httpOptions);
    }

    public getTodos(): Observable<Todo[]> {
        return this._http.get<Todo[]>(`${this._baseUrl}todos`);
    }

    public updateTodoReminder(todo: Todo): Observable<Todo> {
        return this._http.put<Todo>(
            `${this._baseUrl}todos-reminder/${todo.id}`,
            todo,
            this._httpOptions);
    }

    public editTodo(todo: Todo): Observable<EditTodoResponse> {
        return this._http.put<EditTodoResponse>(
            `${this._baseUrl}todos-edit/${todo.id}`,
            todo,
            this._httpOptions);
    }

    public deleteTodo(todo: Todo): Observable<Todo> {
        return this._http.delete<Todo>(
            `${this._baseUrl}todos/${todo.id}`)
    }

}
