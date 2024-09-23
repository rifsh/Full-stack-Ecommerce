import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { CartResponseModel } from 'src/app/core/models/response-model';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-relatedprdct-view',
  templateUrl: './relatedprdct-view.component.html',
  styleUrls: ['./relatedprdct-view.component.css']
})
export class RelatedprdctViewComponent implements OnInit {
  productsView: ResponseProductView[] = [];
  relatedProduct: ResponseProductView[] = [];
  type: string;
  cartIncrement: number = 0;

  constructor(private activateRoute: ActivatedRoute, private srvc: UserProductsService, private srvcUser: UserSrvcService, private toast: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.srvcUser.showCart = true;
    this.srvcUser.wishList = true;
    let routeParam: string = this.activateRoute.snapshot.paramMap.get("id");
    let categoryParam: string = this.activateRoute.snapshot.paramMap.get("category");
    this.srvc.viewProducts(routeParam).subscribe((res: ResponseProduct) => {
      this.productsView.push(res.datas);
      this.srvc.fleteringProductsAction(categoryParam).subscribe((res: ResponseProduct) => {
        this.relatedProduct = res.datas;
        this.relatedProduct = this.relatedProduct.filter((x) => { return x._id != res.id });
      })
    })
    this.srvcUser.showSearchBox = false;
  }

  addToCart(prdctid: string) {
    this.srvc.CartFunction(prdctid).subscribe((res: CartResponseModel) => {
      if (res.message === 'Product is already present in the cart') {
        this.toast.info(res.message);
      } else {
        this.toast.success(res.message);
        this.cartIncrement = res.totalProducts;
      }

    }, (err) => {
      console.log(err);
      if (err.error.message === 'You are not logged in !!') {
        this.toast.info("Please Login!");
        this.router.navigate(['login']);
      } else {
        this.toast.warning('Something went wrong');
      }
    });

  }
}
