import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
    selector: 'app-todos-header',
    templateUrl: './todos-header.component.html',
    styleUrls: ['./todos-header.component.css']
})
export class TodosHeaderComponent implements OnInit, OnDestroy {
    @Output() onDeleteAll = new EventEmitter<void>();
    public title: string = "TODOS"
    public showAddTask: boolean = false;
    public showAddTaskSub!: Subscription;

    constructor(private uiService: UiService) {
        this.showAddTaskSub = this.uiService
            .onToggle()
            .subscribe(value => {
                this.showAddTask = value;
            });
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.showAddTaskSub.unsubscribe();
    }

    public toggleAddTodo(): void {
        this.uiService.toggleAddTodo();
    }

    public emitDeleteAll(): void {
        this.onDeleteAll.emit();
    }
}
