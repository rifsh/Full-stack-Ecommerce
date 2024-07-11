import { Injectable, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakServices implements OnInit {

  constructor(private keyCloakService: KeycloakService) { }

  ngOnInit(): Promise<void> {

    return new Promise((resolve, reject) => {
      const keycloakConfig = {
        url: 'http://localhost:4000/auth',
        realm: 'myrealm',
        clientId: 'myclient'
      };

      this.keyCloakService.init({
        config: keycloakConfig,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        }
      }).then(authenticated => {
        console.log(authenticated ? 'Authenticated' : 'Not Authenticated');
        resolve();
      }).catch(err => {
        console.error('Failed to initialize Keycloak', err);
        reject(err);
      });
    });

  }

}
