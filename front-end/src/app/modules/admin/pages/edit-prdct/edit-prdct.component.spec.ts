import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrdctComponent } from './edit-prdct.component';

describe('EditPrdctComponent', () => {
  let component: EditPrdctComponent;
  let fixture: ComponentFixture<EditPrdctComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPrdctComponent]
    });
    fixture = TestBed.createComponent(EditPrdctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
