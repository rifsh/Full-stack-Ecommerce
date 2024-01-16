import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AllProdutsComponent } from './all-produts/all-produts.component';
import { SharedModule } from '../shared/shared.module';
import { ActionBooksComponent } from './action-books/action-books.component';
import { ScfiBooksComponent } from './scfi-books/scfi-books.component';
import { HorrorBooksComponent } from './horror-books/horror-books.component';
import { HistoryBooksComponent } from './history-books/history-books.component';
import { FormsModule } from '@angular/forms';
import { ViewProductComponent } from './view-product/view-product.component';
import { RelatedprdctViewComponent } from './relatedprdct-view/relatedprdct-view.component';
import { AddToCartComponent } from './view-cart/view-cart';

const routes:Routes = [
  {path:'', component: AllProdutsComponent},
  {path:'action/:type', component: ActionBooksComponent},
  {path:'sci-fi/:type', component: ScfiBooksComponent},
  {path:'history/:type', component: HistoryBooksComponent},
  {path:'horror/:type', component: HorrorBooksComponent},
]

@NgModule({
  declarations: [
    AllProdutsComponent,
    ActionBooksComponent,
    ScfiBooksComponent,
    HorrorBooksComponent,
    HistoryBooksComponent,
    ViewProductComponent,
    RelatedprdctViewComponent,
    AddToCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    
  ]
})
export class ProductsModuleModule { }
