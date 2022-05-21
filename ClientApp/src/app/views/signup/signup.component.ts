import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { SignupService } from 'src/app/services/signup.service';
import { UiService } from 'src/app/services/ui.service';
import { ISignupResponse } from 'src/interfaces';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
    public username: string = "";
    public email: string = "";
    public user_pass: string = "";
    public isLoading: boolean = false;
    public isLoadingSub!: Subscription;

    constructor(
        private _signupService: SignupService,
        private _uiService: UiService,
        private _router: Router
    ) {
        this.isLoadingSub = this._uiService
            .toggleIsLoading()
            .subscribe(value => {
                this.isLoading = value;
            });
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.isLoadingSub.unsubscribe();
    }

    public onSubmit(event: any): void {
        console.log("was submitted", event, "\n", this);
        const input = {
            username: this.username,
            email: this.email,
            user_pass: this.user_pass
        };

        this._uiService.onToggleIsLoading(true);

        this._signupService
            .onSignupSubmit(input)
            .subscribe(
                (success: ISignupResponse) => {
                    this._signupService.onSignupCompleteSetUser(success.user);
                    this._uiService.onToggleIsLoggedIn(true);

                    setTimeout(() => {
                        this._uiService.onToggleIsLoading(false);
                        this._router.navigateByUrl("/todo-list");
                    }, 3000);
                },
                (error: ISignupResponse) => {
                    this._uiService.onToggleIsLoading(false);
                    this._uiService.onToggleIsLoggedIn(false);
                    this._uiService.toggleIsLoggedIn().subscribe();
                    console.log("error when signing up through angular signup service", error);
                }
            );
    }

}
