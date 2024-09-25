import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-list-skeleton',
  templateUrl: './product-list-skeleton.component.html',
  styleUrls: ['./product-list-skeleton.component.css']
})
export class ProductListSkeletonComponent {
  @Input() condition: string = ''
}
