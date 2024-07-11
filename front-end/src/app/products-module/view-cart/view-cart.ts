import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
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

  toast: ToastrService = inject(ToastrService);



  constructor(private productSrvc: UserProductsService, private usrSrvc: UserSrvcService, private prdctsSrvc: UserProductsService) { }

  ngOnInit(): void {
    this.usrSrvc.showSearchBox = false;
    this.usrSrvc.showCart = false;

    this.productSrvc.fetchCartProducts().subscribe((res: ResponseProduct) => {
      this.products = res.datas;
      this.totalPrice = res.totalPrice;
      this.totalQuanndity = res.totalProducts;
    }, (err) => {
      console.log(err.message);
    });
    // this.quandity();
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
      this.productSrvc.fetchCartProducts().subscribe((res: ResponseProduct) => {
        this.totalPrice = res.totalPrice;
        this.products = res.datas;
        this.totalQuanndity = res.totalProducts;
      });
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
