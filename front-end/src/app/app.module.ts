import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './mat-module/mat/mat.module';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminInterceptorInterceptor } from 'src/Interceptors/admin-interceptor.interceptor';
import { UserModule } from './modules/user/user.module';
import { UserInterceptorInterceptor } from 'src/Interceptors/user-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    MatModule,
    // KeycloakAngularModule,
    CoreModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        preventDuplicates: true,
      }
    )

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptorInterceptor, multi: true },
    // KeycloakServices,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   deps: [KeycloakServices],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
