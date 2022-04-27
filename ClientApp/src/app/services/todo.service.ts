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

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.baseUrl}todo`);
    }

    addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(`${this.baseUrl}todo`, todo, this.httpOptions);
    }

}
