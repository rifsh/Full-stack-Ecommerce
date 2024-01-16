import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-action-books',
  templateUrl: './action-books.component.html',
  styleUrls: ['./action-books.component.css']
})
export class ActionBooksComponent {
  actionaBooks: ResponseProductView[] = [];

  constructor(private activateRoute: ActivatedRoute, private srvc: UserSrvcService, private filterSrvc: UserProductsService) { }

  ngOnInit() {
    let routeparam = this.activateRoute.snapshot.paramMap.get("type");
    this.filterSrvc.fleteringProductsAction(routeparam).subscribe((res: ResponseProduct)=>{
      this.actionaBooks = res.datas;
    },(err)=>{
      console.log(err.message);
      
    })
    this.srvc.showSearchBox = false;

  }
}
