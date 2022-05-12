import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosDeleteAllButtonComponent } from './todos-delete-all-button.component';

describe('TodosDeleteAllButtonComponent', () => {
  let component: TodosDeleteAllButtonComponent;
  let fixture: ComponentFixture<TodosDeleteAllButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosDeleteAllButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosDeleteAllButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
