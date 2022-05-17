import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeGetButtonComponent } from './joke-get-button.component';

describe('JokeGetButtonComponent', () => {
  let component: JokeGetButtonComponent;
  let fixture: ComponentFixture<JokeGetButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeGetButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokeGetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
