import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Injectable()
export class UserInterceptorInterceptor implements HttpInterceptor {

  constructor(private usrsrvc: UserSrvcService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localValues = localStorage.getItem('userToken');
    if (localValues) {
      request = request.clone({
        setHeaders:{
          Authorization: `bearer ${localValues}`
        }
      })
    }
    return next.handle(request);
  }
}
