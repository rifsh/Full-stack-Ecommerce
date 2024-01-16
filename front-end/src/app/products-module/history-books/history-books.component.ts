import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { FilterService } from 'src/app/core/services/filter.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-history-books',
  templateUrl: './history-books.component.html',
  styleUrls: ['./history-books.component.css']
})
export class HistoryBooksComponent {
  selected = 'option2';
  historyBooks: ResponseProductView[] = [];


  constructor(private activateRoute: ActivatedRoute, private filterSrvc: UserProductsService, private srvc: UserSrvcService) { }

  ngOnInit(): void {
    this.srvc.showSearchBox = false;
    let routeparam = this.activateRoute.snapshot.paramMap.get("type");
    this.filterSrvc.fleteringProductsAction(routeparam).subscribe((res: ResponseProduct) => {
      this.historyBooks = res.datas;
    });
    // this.historyBooks = this.filterSrvc.filteredProducts;

  }

  languageFilter() {
    console.log('suiii');

  }
}
