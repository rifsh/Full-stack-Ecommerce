import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBooksComponent } from './action-books.component';

describe('ActionBooksComponent', () => {
  let component: ActionBooksComponent;
  let fixture: ComponentFixture<ActionBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionBooksComponent]
    });
    fixture = TestBed.createComponent(ActionBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
