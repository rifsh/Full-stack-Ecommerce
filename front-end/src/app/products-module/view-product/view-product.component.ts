import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  productsView: ResponseProductView[] = [];
  horrorBooks: ResponseProductView[] = [];
  relatedProduct: ResponseProductView[] = [];

  type: string;
  cartIncerment: number;


  constructor(private activateRoute: ActivatedRoute, private srvc: UserProductsService, private srvcUser: UserSrvcService) { 
  }

  ngOnInit(): void {
    let productId: string;
    this.srvcUser.showSearchBox = false;
    this.srvcUser.showCart = true;
    let routeParam: string = this.activateRoute.snapshot.paramMap.get("id");
    let categoryParam: string = this.activateRoute.snapshot.paramMap.get("category");
    this.srvc.viewProducts(routeParam).subscribe((resm: ResponseProduct) => {
      this.productsView.push(resm.datas);
      this.srvc.fleteringProductsAction(categoryParam).subscribe((res: ResponseProduct) => {
        this.relatedProduct = res.datas;
        this.relatedProduct = this.relatedProduct.filter((x) => { return x._id != resm.id });
      })
    });
  }

  addToCart(prdctid: string) {
    this.srvc.CartFunction(prdctid);
    
  }
}
