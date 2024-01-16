import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { MatModule } from '../mat-module/mat/mat.module';
import { RouterModule, Routes } from '@angular/router';
import { AllProdutsComponent } from '../products-module/all-produts/all-produts.component';
import { ProductsModuleModule } from '../products-module/products-module.module';
import { AddToCartComponent } from '../products-module/view-cart/view-cart';
import { ViewProductComponent } from '../products-module/view-product/view-product.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';

// import { ModuleModule } from '../mat-module/module/module.module';



@NgModule({
  declarations: [
    ProductsListComponent,
    NavBarComponent,
    AdminNavbarComponent,
    FooterComponent,
    AdminNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatModule,
  ],
  exports:[
    ProductsListComponent,
    NavBarComponent,
    FooterComponent,
    AdminNavbarComponent
  ]
})
export class SharedModule { }
