import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorUrlComponent } from './error-url.component';

describe('ErrorUrlComponent', () => {
  let component: ErrorUrlComponent;
  let fixture: ComponentFixture<ErrorUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorUrlComponent]
    });
    fixture = TestBed.createComponent(ErrorUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
