import { Component, OnInit } from '@angular/core';
import { UserSrvcService } from '../services/user-srvc.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private srvc: UserSrvcService) { }

  ngOnInit(): void {
    const token: string = localStorage.getItem('userToken');
    const userName: string = localStorage.getItem('username');
    this.srvc.showSearchBox = false;
    this.srvc.showCart = false;
    if (token) {
      this.srvc.usrname = userName;
      this.srvc.isLogged = true;
    }else {
      this.srvc.usrname = 'Please login';
    }
  }

}
