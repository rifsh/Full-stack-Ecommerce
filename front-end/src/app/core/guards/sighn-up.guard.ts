import { CanActivateFn, Router } from '@angular/router';
import { UserSrvcService } from '../services/user-srvc.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { KeycloakAuthGuard } from "keycloak-angular";


export const sighnUpGuard: CanActivateFn = () => {
  const srvc: UserSrvcService = inject(UserSrvcService);
  const toast: ToastrService = inject(ToastrService)
  const route: Router = inject(Router);
  const token: string = localStorage.getItem('userToken')
  if (token) {
    return true;
  } else {
    toast.info('Please login');
    route.navigate(['login']);
    return false;
  }

};
