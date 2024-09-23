import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScroll, ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  allProdutcs: ResponseProductView[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;
  loading: boolean = false;

  constructor(private srvc: UserProductsService, private adminSrvc: AdminSrvcService, private route: Router) {

  }
  ngOnInit(): void {
    this.fetchProducts()
  }

  removeProducts(id: string) {
    this.adminSrvc.removeProducts(id).subscribe((res) => {
      this.fetchProducts();
    }, (err) => {
      alert(err.message);

    })
  }

  fetchProducts() {
    this.adminSrvc.getProducts().subscribe({
      next: (res) => {
        this.allProdutcs = res.datas;
      }
    })
  }
}