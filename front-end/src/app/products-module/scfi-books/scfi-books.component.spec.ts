import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScfiBooksComponent } from './scfi-books.component';

describe('ScfiBooksComponent', () => {
  let component: ScfiBooksComponent;
  let fixture: ComponentFixture<ScfiBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScfiBooksComponent]
    });
    fixture = TestBed.createComponent(ScfiBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
