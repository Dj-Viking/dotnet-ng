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
        //using post since GET on the SPA proxy is very unpredictable and unstable not sure how to configure this properly
        // POST works just fine
        return this._http.get<IGetRandomJokeResponse>(
            `${this._baseUrl}joke`);
    }
}
