import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { Cart } from 'src/app/core/models/cartModel';
import { CartResponseModel, PaymentResponseModel } from 'src/app/core/models/response-model';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './view-cart.html',
  styleUrls: ['./view-cart.css']
})
export class AddToCartComponent {
  priceFind: number;
  products: ResponseProductView[] = [];
  mainProducts: ProductModel[] = [];
  totalPrice: number;
  totalQuanndity: number = 1
  userid: string = localStorage.getItem('userId');
  loading: boolean = true;
  toast: ToastrService = inject(ToastrService);



  constructor(private productSrvc: UserProductsService, private usrSrvc: UserSrvcService, private prdctsSrvc: UserProductsService) { }

  ngOnInit(): void {
    this.usrSrvc.showSearchBox = false;
    this.usrSrvc.showCart = false;
    this.usrSrvc.wishList = true;
    this.fetchCart();

    // this.quandity();
  }

  fetchCart() {
    this.productSrvc.fetchCartProducts().subscribe((res: Cart) => {
      this.products = res.datas.products;
      this.loading = false;
      this.totalPrice = res.datas.totalPrice;
      this.totalQuanndity = res.datas.products.length;
    }, (err) => {
      console.log(err.message);
    });
  }
  async quandity(id?) {
    await this.productSrvc.quandityIncr(id).subscribe((res) => {
      console.log(res);

    }, (err) => {
      console.log(err);

    })
    // this.totalPrice = 0;
    // this.totalQuanndity = 0;
    // for (const i of this.products) {
    //   this.totalPrice += i.quandity * i.price;
    //   this.totalQuanndity += i.quandity;
    // }
  }

  deletePrdctCart(prdcts: string) {
    this.prdctsSrvc.deleteCartProducts(prdcts, this.userid).subscribe((res: CartResponseModel) => {
      this.toast.info(res.message);
      this.fetchCart();
    })
  }
  payment() {
    this.prdctsSrvc.paymentSection().subscribe((res: PaymentResponseModel) => {
      window.location.href = res.link;
    }, (err) => {
      this.toast.warning("Something went wrong!!")
    })
  }

}
