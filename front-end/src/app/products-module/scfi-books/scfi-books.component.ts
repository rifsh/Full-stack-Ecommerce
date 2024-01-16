import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { FilterService } from 'src/app/core/services/filter.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-scfi-books',
  templateUrl: './scfi-books.component.html',
  styleUrls: ['./scfi-books.component.css']
})
export class ScfiBooksComponent {
  type:string;
  scifiBooks:ResponseProductView[] =[];

  constructor(private activateRoute:ActivatedRoute,private filterSrvc:UserProductsService,private srvc:UserSrvcService) {}

  ngOnInit(): void {
  let routeparam: string = this.activateRoute.snapshot.paramMap.get("type");
  this.srvc.showSearchBox = false;
  this.filterSrvc.fleteringProductsAction(routeparam).subscribe((res:ResponseProduct)=>{
    this.scifiBooks = res.datas;
  })
  }
}
