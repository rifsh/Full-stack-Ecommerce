import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegPageComponent } from './pages/reg-page/reg-page.component';
import { MatModule } from 'src/app/mat-module/mat/mat.module';
import { FormsModule } from '@angular/forms';
import { AllProdutsComponent } from './pages/all-produts/all-produts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { RelatedprdctViewComponent } from './pages/relatedprdct-view/relatedprdct-view.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AddToCartComponent } from './pages/view-cart/view-cart.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ViewWishlistComponent } from './pages/view-wishlist/view-wishlist.component';
import { SharedModule } from './shared/shared.module';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { ProductListSkeletonComponent } from './components/product-list-skeleton/product-list-skeleton.component';



@NgModule({
  declarations: [
    LandingPageComponent,
    UserProfileComponent,
    AllProdutsComponent,
    ViewProductComponent,
    RelatedprdctViewComponent,
    RegPageComponent,
    UserProfileComponent,
    AddToCartComponent,
    ProductsListComponent,
    ViewWishlistComponent,
    PaymentSuccessComponent,
    ProductListSkeletonComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    FormsModule,
    MatModule,
    SharedModule
  ],
  exports:[
    ProductsListComponent
  ]
})
export class UserModule { }
