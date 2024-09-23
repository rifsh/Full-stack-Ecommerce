import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedprdctViewComponent } from './relatedprdct-view.component';

describe('RelatedprdctViewComponent', () => {
  let component: RelatedprdctViewComponent;
  let fixture: ComponentFixture<RelatedprdctViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatedprdctViewComponent]
    });
    fixture = TestBed.createComponent(RelatedprdctViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
