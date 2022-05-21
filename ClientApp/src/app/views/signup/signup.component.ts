import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/services/signup.service';
import { UiService } from 'src/app/services/ui.service';
import { ISignupResponse } from 'src/interfaces';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public username: string = "";
    public email: string = "";
    public user_pass: string = "";

    constructor(private _signupService: SignupService, private _uiService: UiService) { }

    public ngOnInit(): void {
    }

    public onSubmit(event: any): void {
        console.log("was submitted", event, "\n", this);
        const input = {
            username: this.username,
            email: this.email,
            user_pass: this.user_pass
        };

        this._signupService
            .onSignupSubmit(input)
            .subscribe(
                (success: ISignupResponse) => {
                    this._signupService.onSignupCompleteSetUser(success.user);
                    this._uiService.onToggleIsLoggedIn(true);
                    this._uiService.toggleIsLoggedIn();
                },
                (error: ISignupResponse) => {
                    this._uiService.onToggleIsLoggedIn(false);
                    this._uiService.toggleIsLoggedIn().subscribe();
                    console.log("error when signing up through angular signup service", error);
                }
            );

    }

}
