import { Injectable, OnInit,Output,EventEmitter } from '@angular/core';
import { ProductModel } from '../models/allproducts.model';
import { UserProductsService } from './user-products.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FilterService implements OnInit {

  filteredProducts: ProductModel[] = [];
  findedProductView: ProductModel[] = [];
  relaPrdct: ProductModel[] = [];
  cartPrdcts: ProductModel[] = [];
  allBooks: ProductModel[] = [];

  constructor(private srvc: UserProductsService, private toast: ToastrService) { }

  fleteringProductsAction(paramType: string) {

    let findeProducts = this.srvc.allProductsSrvc.filter((x) => {
      return x.type === paramType;
    })
    this.filteredProducts = findeProducts;
  }

  ngOnInit(): void {

  }


  viewProducts(id: number, prdctSrvctype?: string) {
    let findProduct = this.srvc.allProductsSrvc.filter((x) => {
      return x.id === id
    })
    this.findedProductView = findProduct;
    let prdctType: string = this.findedProductView[0].type;
    let relatedPrdctFind = this.srvc.allProductsSrvc.filter((x) => {
      return x.type === prdctType && x.id != id;
    })
    this.relaPrdct = relatedPrdctFind;
  }

  


}
