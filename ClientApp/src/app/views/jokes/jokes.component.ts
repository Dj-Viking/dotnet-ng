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
    public selectedCategory: string = "dev";

    constructor(private _jokeService: JokeService) {
    }

    ngOnInit(): void {
        this._jokeService
            .getJokeByCategory("dev")
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
        if (!this.selectedCategory) {
            this.jokes.push(joke);
        } else {
            this._jokeService
                .getJokeByCategory(this.selectedCategory)
                .subscribe(
                    (success: IGetJokeByCategoryResponse) => {
                        this.jokes.push(success.joke);
                    },
                    (error: IGetJokeByCategoryResponse) => {
                        console.log("error during getting joke when category was selected and emitted up", error.error);
                    }
                )
        }
    }

    onGetJokeFromSelectEmit(category: string): void {
        this._jokeService
            .onCategorySelect()
            .subscribe(
                (_category: string) => {
                    console.log("have access to emitted subject", _category);
                    this.selectedCategory = _category;
                },
                (error) => {
                    console.error("error during on category select", error);
                }
            );
        // this._jokeService
        //     .getJokeByCategory(category)
        //     .subscribe(
        //         (success: IGetJokeByCategoryResponse) => {
        //             this.jokes.push(success.joke);
        //         },
        //         (error: IGetJokeByCategoryResponse) => {
        //             console.log("error when getting joke by select", error);
        //         }
        //     )
    }

}
