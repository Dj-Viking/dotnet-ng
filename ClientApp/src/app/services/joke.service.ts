import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IGetCategoriesResponse, IGetJokeByCategoryResponse, IGetRandomJokeResponse, Joke } from "src/interfaces";

interface MyHttpOptions {
    headers: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class JokeService {
    private _baseUrl!: string;
    private categorySelect: string = "";
    private _categorySubject = new Subject<string>();

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

    public getJokeCategories(): Observable<IGetCategoriesResponse> {
        return this._http.get<IGetCategoriesResponse>(
            `${this._baseUrl}joke-categories`);
    }

    public getJokeByCategory(category: string): Observable<IGetJokeByCategoryResponse> {
        this._categorySubject.next(category);
        return this._http.get<IGetJokeByCategoryResponse>(
            `${this._baseUrl}joke-by-category/${category}`);
    }

    public changeCategorySelect(category: string): void {
        this.categorySelect = category;
        this._categorySubject.next(this.categorySelect);
    }

    public onCategorySelect(): Observable<string> {
        console.log("value of category as subject observable", this._categorySubject.asObservable());
        return this._categorySubject.asObservable();
    }
}
