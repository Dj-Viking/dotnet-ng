import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ISignupResponse, UserClass } from 'src/interfaces';

interface MyHttpOptions {
    headers: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    private _baseUrl!: string;
    private _userSubject = new Subject<UserClass>();
    private _httpOptions: MyHttpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json"
        })
    }
    constructor(private _httpClient: HttpClient, @Inject("BASE_URL") baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public onSignupSubmit(input: { username: string, user_pass: string, email: string }): Observable<ISignupResponse> {
        return this._httpClient.post<ISignupResponse>(
            `${this._baseUrl}signup`, input, this._httpOptions
        )
    }

    public onSignupCompleteSetUser(user: UserClass): void {
        this._userSubject.next(user);
    }

    public loggedInUser(): Observable<UserClass> {
        return this._userSubject.asObservable();
    }

}
