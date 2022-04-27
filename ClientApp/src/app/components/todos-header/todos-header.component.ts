import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
    selector: 'app-todos-header',
    templateUrl: './todos-header.component.html',
    styleUrls: ['./todos-header.component.css']
})
export class TodosHeaderComponent implements OnInit {
    public title: string = "TODOS"
    public showAddTask: boolean = false;
    public subscription!: Subscription;
    constructor(private uiService: UiService) {
        this.subscription = this.uiService
            .onToggle()
            .subscribe(value => {
                this.showAddTask = value;
            });
    }

    ngOnInit(): void {
    }

    toggleAddTodo(): void {
        // console.log("header toggle add todo on the emitted button click from child component");
        this.uiService.toggleAddTodo();
    }
}
