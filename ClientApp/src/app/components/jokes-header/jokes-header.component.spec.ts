import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesHeaderComponent } from './jokes-header.component';

describe('JokesHeaderComponent', () => {
  let component: JokesHeaderComponent;
  let fixture: ComponentFixture<JokesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
