import { Component, OnInit } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { IGetRandomJokeResponse, Joke } from 'src/interfaces';

@Component({
    selector: 'app-jokes',
    templateUrl: './jokes.component.html',
    styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {
    public jokes: Joke[] = [];

    constructor(private _jokeService: JokeService) { }

    ngOnInit(): void {
        this._jokeService
            .getRandomJoke()
            .subscribe(
                (success: IGetRandomJokeResponse) => {
                    this.jokes.push(success.joke);
                },
                (error: IGetRandomJokeResponse) => {
                    console.log("error when getting random joke");
                }
            )
    }

}
