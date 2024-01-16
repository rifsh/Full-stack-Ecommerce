import { Component,OnInit } from '@angular/core';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit{

  constructor(private srvc:UserSrvcService) {}
  isSideBarCollapsed: boolean = false


  toggleSideBar(): void {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem('token');
  }
}
