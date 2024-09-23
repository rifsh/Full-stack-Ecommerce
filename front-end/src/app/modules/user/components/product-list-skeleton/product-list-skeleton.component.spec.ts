import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSkeletonComponent } from './product-list-skeleton.component';

describe('ProductListSkeletonComponent', () => {
  let component: ProductListSkeletonComponent;
  let fixture: ComponentFixture<ProductListSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListSkeletonComponent]
    });
    fixture = TestBed.createComponent(ProductListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
