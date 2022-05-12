import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
    selector: 'app-todos-header',
    templateUrl: './todos-header.component.html',
    styleUrls: ['./todos-header.component.css']
})
export class TodosHeaderComponent implements OnInit {
    @Output() deleteAll = new EventEmitter<void>();
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

    public ngOnInit(): void {
    }

    public toggleAddTodo(): void {
        this.uiService.toggleAddTodo();
    }

    public emitDeleteAll(): void {
        this.deleteAll.emit();
    }
}
