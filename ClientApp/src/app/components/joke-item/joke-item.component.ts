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

    public ngOnInit(): void {
        Object.assign(this, { ...this, ...this.joke })
    }

}
