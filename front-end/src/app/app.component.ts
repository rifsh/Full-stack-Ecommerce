import { Component, HostListener, OnDestroy } from '@angular/core';
import { UserSrvcService } from './core/services/user-srvc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'book-app';
  
  constructor(private srvc: UserSrvcService) {
    const token: string = localStorage.getItem('userToken');
    const usrName: string = localStorage.getItem('username');

    if (token) {
      srvc.usrname = usrName;
      srvc.isLogged = true;
    } else {
      srvc.isLogged = false;
    }
  }

  
  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander(event: BeforeUnloadEvent) {
  //     localStorage.clear();
  //   }
    
    ngOnDestroy(): void {
    }


}
