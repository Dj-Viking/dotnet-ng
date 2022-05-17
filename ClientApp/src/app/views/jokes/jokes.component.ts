import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { JokeService } from 'src/app/services/joke.service';
import { IGetJokeByCategoryResponse, IGetRandomJokeResponse, Joke } from 'src/interfaces';

@Component({
    selector: 'app-jokes',
    templateUrl: './jokes.component.html',
    styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {
    public jokes: Joke[] = [];
    public selectedCategory: string = "";

    constructor(private _jokeService: JokeService) {
    }

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

    onGetJokeFromButtonEmit(joke: Joke): void {
        this.jokes.push(joke);
    }

    onGetJokeFromSelectEmit(category: string): void {
        this._jokeService
            .getJokeByCategory(category)
            .subscribe(
                (success: IGetJokeByCategoryResponse) => {
                    this.jokes.push(success.joke);
                },
                (error: IGetJokeByCategoryResponse) => {
                    console.log("error when getting joke by select", error);
                }
            )
    }

}
