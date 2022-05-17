import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JokeService } from 'src/app/services/joke.service';
import { IGetCategoriesResponse } from 'src/interfaces';


@Component({
    selector: 'app-joke-category-select',
    templateUrl: './joke-category-select.component.html',
    styleUrls: ['./joke-category-select.component.css']
})
export class JokeCategorySelectComponent implements OnInit {
    @Output() onSelectEmit = new EventEmitter<string>();
    public categories: Array<string> = [];
    public selected: string = "";

    constructor(private _jokeService: JokeService) { }

    ngOnInit(): void {
        this._jokeService
            .getJokeCategories()
            .subscribe(
                (success: IGetCategoriesResponse) => {
                    this.categories = success.categories;
                    console.log("this.categories", this.categories);

                },
                (error: IGetCategoriesResponse) => {
                    console.log("error during get joke categories", error.error);
                }
            )
    }

    onSelect(event: any): void {
        //on change event 
        console.log("event", event.type, event.target?.value);
        this.selected = event.target.value
        this.onSelectEmit.emit(this.selected);
    }

}
