import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddTodoResponse, IEditTodoResponse, IUpdateTodoReminderResponse, Todo } from 'src/interfaces';

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

    public addTodo(todo: Todo): Observable<IAddTodoResponse> {
        return this._http.post<IAddTodoResponse>(
            `${this._baseUrl}todos`,
            todo,
            this._httpOptions);
    }

    public getTodos(): Observable<Todo[]> {
        return this._http.get<Todo[]>(`${this._baseUrl}todos`);
    }

    public updateTodoReminder(todo: Todo): Observable<IUpdateTodoReminderResponse> {
        // sending opposite of what the value was the moment I clicked the todo
        return this._http.put<IUpdateTodoReminderResponse>(
            `${this._baseUrl}todos-reminder/${todo.id}`,
            !todo.reminder,
            this._httpOptions);
    }

    public editTodo(todo: Todo): Observable<IEditTodoResponse> {
        return this._http.put<IEditTodoResponse>(
            `${this._baseUrl}todos-edit/${todo.id}`,
            todo,
            this._httpOptions);
    }

    public deleteTodo(todo: Todo): Observable<Todo> {
        return this._http.delete<Todo>(
            `${this._baseUrl}todos/${todo.id}`)
    }

}
