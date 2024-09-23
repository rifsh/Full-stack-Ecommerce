import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRouterModule } from './admin-routing.module';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditPrdctComponent } from './pages/edit-prdct/edit-prdct.component';
import { MatModule } from 'src/app/mat-module/mat/mat.module';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { HomeComponent } from './pages/home/home.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    AdminLoginComponent,
    DashboardComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AddProductComponent,
    EditPrdctComponent,
    HomeComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatModule,
    AdminRouterModule,
    SharedModule
  ]
})
export class AdminModule { }
