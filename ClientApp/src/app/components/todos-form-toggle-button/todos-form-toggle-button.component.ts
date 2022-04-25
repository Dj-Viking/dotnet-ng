import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-todos-form-toggle-button',
    templateUrl: './todos-form-toggle-button.component.html',
    styleUrls: ['./todos-form-toggle-button.component.css']
})
export class TodosFormToggleButtonComponent implements OnInit {
    @Input() color!: string;
    @Input() text!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
