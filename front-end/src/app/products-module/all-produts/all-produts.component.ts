import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { FilterService } from 'src/app/core/services/filter.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-all-produts',
  templateUrl: './all-produts.component.html',
  styleUrls: ['./all-produts.component.css']
})
export class AllProdutsComponent {
  totalBooks: number = 0;
  prdctCondition: boolean = true;
  allProducts: ResponseProductView[] = [];
  searchValue: string = '';
  searchedArray: ResponseProductView[] = [];
  cartIincrement: number = 12;
  page: number

  constructor(private srvc: UserProductsService, private usrsrvc: UserSrvcService, private activateRoute: ActivatedRoute, private filterSrvc: UserProductsService) {

  }


  ngOnInit(): void {
    this.usrsrvc.showSearchBox = true;
    const token: string = localStorage.getItem('userToken');
    if (token) {
      this.usrsrvc.isLogged = true;
      this.usrsrvc.showCart = true;
    }
    this.srvc.getProducts().subscribe((res: ResponseProduct) => {
      this.allProducts = res.datas
      this.totalBooks = this.allProducts.length;

    })

  }

  changeSearch(searchContent: string) {
    

    this.searchValue = searchContent;
    this.searchedArray = this.allProducts.filter((x) => { return x.title.toLowerCase().includes(this.searchValue.toLowerCase()) });
    if (this.searchValue.length === 0) {
      this.prdctCondition = true;
    } else {
      this.prdctCondition = false;
    }
  }
}
