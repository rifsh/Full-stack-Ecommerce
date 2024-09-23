import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { AllProdutsComponent } from "./pages/all-produts/all-produts.component";
import { ViewProductComponent } from "src/app/modules/user/pages/view-product/view-product.component";
import { RelatedprdctViewComponent } from "./pages/relatedprdct-view/relatedprdct-view.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { AddToCartComponent } from "./pages/view-cart/view-cart.component";
import { sighnUpGuard } from "src/app/core/guards/sighn-up.guard";
import { ViewWishlistComponent } from "./pages/view-wishlist/view-wishlist.component";
import { PaymentSuccessComponent } from "./pages/payment-success/payment-success.component";

const userRoutes: Routes = [
    { path: "", component: LandingPageComponent },
    { path: "profile", canActivate: [sighnUpGuard], component: UserProfileComponent },
    { path: "all-products", component: AllProdutsComponent },
    { path: 'all-products/viewproduct/:id/:category', canActivate: [sighnUpGuard], component: ViewProductComponent },
    { path: 'all-products/viewproduct/viewrelatedprdct/:id/:category', component: RelatedprdctViewComponent },
    { path: 'view-cart', canActivate: [sighnUpGuard], component: AddToCartComponent },
    { path: 'view-wishlist', canActivate: [sighnUpGuard], component: ViewWishlistComponent },
    { path: 'payment-success', canActivate: [sighnUpGuard], component: PaymentSuccessComponent },

]

@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule]
})

export class UserRoutingModule { }