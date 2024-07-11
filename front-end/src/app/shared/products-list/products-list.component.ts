import { Input } from "@angular/core";
import { Component } from '@angular/core';
import { ProductModel, ResponseProductView } from "src/app/core/models/allproducts.model";
import { UserProductsService } from "src/app/core/services/user-products.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  @Input() allProducts: ResponseProductView;

  constructor(private srvc: UserProductsService) {

  }


  addToCart(prdctid: string) {
    this.srvc.CartFunction(prdctid);
  }
}
