import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

    constructor(private routers: Router, protected readonly keycloak: KeycloakService) {
        super(routers, keycloak);
    }

    isAccessAllowed(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.authenticated) {
                resolve(true);
            } else {
                this.keycloak.login();
            }
        });
    }
}
