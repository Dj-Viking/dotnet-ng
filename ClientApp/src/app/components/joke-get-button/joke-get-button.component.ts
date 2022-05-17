import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { IGetRandomJokeResponse, Joke } from 'src/interfaces';

@Component({
    selector: 'app-joke-get-button',
    templateUrl: './joke-get-button.component.html',
    styleUrls: ['./joke-get-button.component.css']
})
export class JokeGetButtonComponent implements OnInit {
    @Output() onGetJoke = new EventEmitter<Joke>();

    constructor(private jokeService: JokeService) { }

    ngOnInit(): void {
    }

    public getJoke(): void {
        this.jokeService
            .getRandomJoke()
            .subscribe(
                (_success: IGetRandomJokeResponse) => {
                    this.onGetJoke.emit(_success.joke);
                },
                (error: IGetRandomJokeResponse) => {
                    console.log("error when getting joke clicking button");
                }
            )
    }

}
