import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { MatModule } from 'src/app/mat-module/mat/mat.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatModule
  ],
  exports: [
    AdminNavbarComponent
  ]
})
export class SharedModule { }
