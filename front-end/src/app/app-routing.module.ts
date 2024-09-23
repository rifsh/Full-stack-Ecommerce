import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorUrlComponent } from './core/error-url/error-url.component';
import { AdminUsersComponent } from './modules/admin/pages/admin-users/admin-users.component';
import { AdminProductsComponent } from './modules/admin/pages/admin-products/admin-products.component';
import { AddProductComponent } from './modules/admin/pages/add-product/add-product.component';
import { EditPrdctComponent } from './modules/admin/pages/edit-prdct/edit-prdct.component';
import { adminGuard } from './core/guards/admin-quard.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegPageComponent } from './modules/user/pages/reg-page/reg-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: RegPageComponent },
  { path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: "user", pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'login', component: LoginPageComponent },
  // { path: 'all-products', loadChildren: () => import('./products-module/products-module.module').then(m => m.ProductsModuleModule) },
  // { path: 'action/:type', component: ActionBooksComponent },
  // { path: 'sci-fi/:type', component: ScfiBooksComponent },
  // { path: 'history/:type', component: HistoryBooksComponent },
  // { path: 'horror/:type', component: HorrorBooksComponent },
  // { path: 'viewproduct/:id/:category', component: ViewProductComponent },
  // { path: 'viewrelatedprdct/:id/:category', component: RelatedprdctViewComponent },
  // { path: 'view-cart', canActivate: [sighnUpGuard], component: AddToCartComponent },

  //Admin
  // { path: 'admin-login', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // { path: 'admin-dashboard', canActivate: [adminGuard], component: DashboardComponent },
  // { path: 'admin-users', component: AdminUsersComponent }, 
  // { path: 'admin-products', component: AdminProductsComponent },
  // { path: 'admin-edit', component: EditProductComponent },
  // { path: 'add-product', component: AddProductComponent },
  // { path: 'edit-product/:id', component: EditPrdctComponent },
  // { path: '**', component: ErrorUrlComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

