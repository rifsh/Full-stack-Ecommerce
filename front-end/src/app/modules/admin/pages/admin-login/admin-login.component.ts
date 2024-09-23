import { Component,OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  ngOnInit(): void {
      localStorage.clear();
  }
  constructor( private srvc: UserSrvcService) {}
  @ViewChild('adminLoginForm') loginForm: NgForm;


  loginFunction() {    
    this.srvc.adminLogin(this.loginForm.value.userName,this.loginForm.value.password);
  }

}
