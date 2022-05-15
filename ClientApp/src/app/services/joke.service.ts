import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGetRandomJokeResponse, Joke } from "src/interfaces";

interface MyHttpOptions {
    headers: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class JokeService {
    private _baseUrl!: string;
    private _httpOptions: MyHttpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    };

    constructor(
        private _http: HttpClient,
        @Inject("BASE_URL") baseUrl: string
    ) {
        this._baseUrl = baseUrl;
    }

    public getRandomJoke(): Observable<IGetRandomJokeResponse> {
        return this._http.get<IGetRandomJokeResponse>(
            `${this._baseUrl}joke`);
    }
}
