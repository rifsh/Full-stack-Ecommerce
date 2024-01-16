import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  allProdutcs: ResponseProductView[] = [];
  constructor(private srvc: UserProductsService, private adminSrvc: AdminSrvcService, private route: Router) {

    // this.allProdutcs = srvc.allProductsSrvc;
  }
  ngOnInit(): void {
    this.adminSrvc.getProducts().subscribe((res: ResponseProduct) => {
      this.allProdutcs = res.datas;
      
    }, (err) => {      
    });
  }

  removeProducts(id: string) {
    this.adminSrvc.removeProducts(id).subscribe((res) => {
      this.adminSrvc.getProducts().subscribe((res: ResponseProduct) => {
        this.allProdutcs = res.datas;
      }, (err) => {
        alert(err.message);
      });
    }, (err) => {
      alert(err.message);

    })

  }

}
