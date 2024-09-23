import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserProductsService } from './services/user-products.service';
import { UserSrvcService } from './services/user-srvc.service';
import { ErrorUrlComponent } from './error-url/error-url.component';
import { AdminSrvcService } from './services/admin-srvc.service';
import { FilterService } from './services/filter.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
]


@NgModule({
  declarations: [
    ErrorUrlComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),

  ],
  providers: [
    UserProductsService,
    UserSrvcService,
    FilterService,
    AdminSrvcService,
  ]
})
export class CoreModule { }
