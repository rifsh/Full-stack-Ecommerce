import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';
import { UserProductService } from '../../services/user-product.service';

@Component({
  selector: 'app-all-produts',
  templateUrl: './all-produts.component.html',
  styleUrls: ['./all-produts.component.css']
})
export class AllProdutsComponent {
  loading: boolean = true;
  totalBooks: number = 0;
  allProducts: ResponseProductView[] = [];
  searchValue: string = '';
  searchedArray: ResponseProductView[] = [];
  cartIincrement: number = 0;
  page: number
  category: string;

  constructor(private productSrvc: UserProductService, private usrsrvc: UserSrvcService, private activateRoute: ActivatedRoute, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.filterProducts(this.category);
      } else {
        this.fetchProducts()
      }
    });
    this.usrsrvc.showSearchBox = true;
    const token: string = localStorage.getItem('userToken');
    if (token) {
      this.usrsrvc.isLogged = true;
      this.usrsrvc.showCart = true;
      this.usrsrvc.wishList = true;
    }
  }

  fetchProducts() {
    this.loading = true;
    this.productSrvc.getProducts().subscribe((res: ResponseProduct) => {
      this.allProducts = res.datas;
      this.loading = false;
      this.totalBooks = res.datas.length
    })
  }

  recieveCount(count) {
    this.cartIincrement = count;

  }

  changeSearch(searchContent:ResponseProduct) {
    this.allProducts = searchContent.datas;
    this.totalBooks  = this.allProducts.length;
    if (this.allProducts) {
      this.searchValue = 'ss'
    }
  }

  filterProducts(category: string) {
    this.loading = true;
    this.productSrvc.getFilteredProducts(category).subscribe({
      next: (res) => {
        this.loading = false;
        this.allProducts = res.datas;
        this.totalBooks = res.totalProducts;
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
