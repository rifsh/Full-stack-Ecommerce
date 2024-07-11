import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorUrlComponent } from './core/error-url/error-url.component';
import { sighnUpGuard } from './core/guards/sighn-up.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { ActionBooksComponent } from './products-module/action-books/action-books.component';
import { AddToCartComponent } from './products-module/view-cart/view-cart';
import { HistoryBooksComponent } from './products-module/history-books/history-books.component';
import { HorrorBooksComponent } from './products-module/horror-books/horror-books.component';
import { RelatedprdctViewComponent } from './products-module/relatedprdct-view/relatedprdct-view.component';
import { ScfiBooksComponent } from './products-module/scfi-books/scfi-books.component';
import { ViewProductComponent } from './products-module/view-product/view-product.component';
import { RegPageComponent } from './reg-page/reg-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { EditPrdctComponent } from './admin/edit-prdct/edit-prdct.component';
import { adminGuard } from './core/guards/admin-quard.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'sign-up', component: RegPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'all-products', loadChildren: () => import('./products-module/products-module.module').then(m => m.ProductsModuleModule) },
  { path: 'action/:type', component: ActionBooksComponent },
  { path: 'sci-fi/:type', component: ScfiBooksComponent },
  { path: 'history/:type', component: HistoryBooksComponent },
  { path: 'horror/:type', component: HorrorBooksComponent },
  { path: 'viewproduct/:id/:category', component: ViewProductComponent },
  { path: 'viewrelatedprdct/:id/:category', component: RelatedprdctViewComponent },
  { path: 'view-cart', canActivate: [sighnUpGuard], component: AddToCartComponent },

  //Admin
  { path: 'admin-login', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'admin-dashboard', canActivate: [adminGuard], component: DashboardComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-products', component: AdminProductsComponent },
  { path: 'admin-edit', component: EditProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: EditPrdctComponent },
  { path: '**', component: ErrorUrlComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

