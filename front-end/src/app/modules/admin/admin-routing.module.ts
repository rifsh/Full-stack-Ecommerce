import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./pages/admin-login/admin-login.component";
import { adminGuard } from "src/app/core/guards/admin-quard.guard";
import { AdminUsersComponent } from "./pages/admin-users/admin-users.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { AdminProductsComponent } from "./pages/admin-products/admin-products.component";
import { EditPrdctComponent } from "./pages/edit-prdct/edit-prdct.component";
import { AddProductComponent } from "./pages/add-product/add-product.component";
import { AddCategoryComponent } from "./pages/add-category/add-category.component";

const adminRoutes: Routes = [
    { path: 'admin-login', component: AdminLoginComponent },
    {
        path: 'home', canActivate: [adminGuard], component: HomeComponent, children: [
            { path: 'dashboard', component: DashboardComponent, outlet: 'primary' },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'admin-users', canActivate: [adminGuard], component: AdminUsersComponent },
            { path: 'products', canActivate: [adminGuard], component: AdminProductsComponent },
            { path: 'admin-edit/:id', canActivate: [adminGuard], component: EditPrdctComponent },
            { path: 'add-product', canActivate: [adminGuard], component: AddProductComponent },
            { path: 'category', canActivate: [adminGuard], component: AddCategoryComponent },

        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})


export class AdminRouterModule {

}