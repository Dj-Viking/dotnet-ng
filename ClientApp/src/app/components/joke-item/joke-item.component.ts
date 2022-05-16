import { Component, Input, OnInit } from '@angular/core';
import { Joke } from 'src/interfaces';

@Component({
    selector: 'app-joke-item',
    templateUrl: './joke-item.component.html',
    styleUrls: ['./joke-item.component.css']
})
export class JokeItemComponent implements OnInit {
    @Input() joke!: Joke;
    public created_at!: string;
    public categories!: Array<string>;
    public icon_url!: string;
    public id!: string;
    public url!: string;
    public value!: string;
    constructor() {

    }

    ngOnInit(): void {
        this.created_at = this.joke.created_at;
        this.categories = this.joke.categories;
        this.icon_url = this.joke.icon_url;
        this.id = this.joke.id;
        this.url = this.joke.url;
        this.value = this.joke.value;
    }

}
