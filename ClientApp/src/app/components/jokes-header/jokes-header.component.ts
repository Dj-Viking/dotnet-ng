import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-jokes-header',
    templateUrl: './jokes-header.component.html',
    styleUrls: ['./jokes-header.component.css']
})
export class JokesHeaderComponent implements OnInit {
    @Input() title!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
