import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosFormToggleButtonComponent } from './todos-form-toggle-button.component';

describe('TodosFormToggleButtonComponent', () => {
    let component: TodosFormToggleButtonComponent;
    let fixture: ComponentFixture<TodosFormToggleButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TodosFormToggleButtonComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosFormToggleButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
