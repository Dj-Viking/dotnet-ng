import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public username: string = "";
    public email: string = "";
    public password: string = "";

    constructor() { }

    public ngOnInit(): void {
    }

    public onSubmit(event: any): void {
        console.log("was submitted", event);

    }

}
