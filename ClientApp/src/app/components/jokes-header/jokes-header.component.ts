import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Joke } from 'src/interfaces';

@Component({
    selector: 'app-jokes-header',
    templateUrl: './jokes-header.component.html',
    styleUrls: ['./jokes-header.component.css']
})
export class JokesHeaderComponent implements OnInit {

    @Input() title!: string;
    @Output() onButtonGetJokeEmit = new EventEmitter<Joke>();

    constructor() { }

    ngOnInit(): void {
    }

    public onButtonGetJoke(joke: Joke): void {
        console.log("got emitted joke from the button child component", joke);
        this.onButtonGetJokeEmit.emit(joke);
    }

}
