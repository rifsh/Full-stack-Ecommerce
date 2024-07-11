import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserProductsService } from './services/user-products.service';
import { UserSrvcService } from './services/user-srvc.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ErrorUrlComponent } from './error-url/error-url.component';
import { SharedModule } from '../shared/shared.module';
import { AdminSrvcService } from './services/admin-srvc.service';
import { FilterService } from './services/filter.service';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: '**', component: ErrorUrlComponent},
]


@NgModule({
  declarations: [
    LandingPageComponent,
    ErrorUrlComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule

  ],
  providers:[
    UserProductsService,
    UserSrvcService,
    FilterService,
    AdminSrvcService,
    KeycloakAngularModule
  ]
})
export class CoreModule { }
