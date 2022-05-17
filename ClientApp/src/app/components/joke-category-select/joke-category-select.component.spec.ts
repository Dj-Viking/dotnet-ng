import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeCategorySelectComponent } from './joke-category-select.component';

describe('JokeCategorySelectComponent', () => {
  let component: JokeCategorySelectComponent;
  let fixture: ComponentFixture<JokeCategorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeCategorySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
