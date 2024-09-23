import { EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProductModel, ResponseProductView } from "src/app/core/models/allproducts.model";
import { Cart } from "src/app/core/models/cartModel";
import { CartResponseModel } from "src/app/core/models/response-model";
import { UserProductsService } from "src/app/core/services/user-products.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Input() allProducts: ResponseProductView;
  @Output() cartCount = new EventEmitter<number>();

  cartAddedConditon: boolean = false;
  cartProducts: ResponseProductView[] = []

  constructor(private srvc: UserProductsService, private toast: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    // this.fetchCartProducts()
  }



  addToCart(prdctid: string) {
    this.cartAddedConditon = true;
    const c = this.srvc.CartFunction(prdctid).subscribe((res: CartResponseModel) => {
      if (res.message === 'Product is already present in the cart') {
        this.toast.info(res.message);
        this.cartAddedConditon = false;
      } else {
        this.toast.success(res.message);
        this.cartAddedConditon = false;
        this.cartCount.emit(res.totalProducts)
      }

    }, (err) => {
      console.log(err);
      if (err.error.message === 'You are not logged in !!') {
        this.toast.info("Please Login!");
        this.cartAddedConditon = false;
        this.router.navigate(['login']);
      } else {
        this.toast.warning('Something went wrong');
        this.cartAddedConditon = false;
      }
    });
  }

  cartButtonConsition(id: string) {
    // console.log(id);
    // console.log(this.cartProducts.map((x)=>{
    //   return x._id === id
    // }));
    
  }

  // fetchCartProducts() {
  //   this.srvc.fetchCartProducts().subscribe({
  //     next: (res: Cart) => {
  //       this.cartProducts = res.datas.products;
  //     }
  //   })
  // }

  addToWishList(id: string) {
    this.srvc.addToWishlist(id).subscribe({
      next: (res) => {
        this.toast.success('Added to wishlist')
      },
      error: (err) => {
        this.toast.info('Product is already in cart')
        console.log(err);
      }
    })
  }
}
