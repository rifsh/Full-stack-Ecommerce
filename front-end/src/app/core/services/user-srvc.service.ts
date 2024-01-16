import { Injectable, OnInit, inject } from '@angular/core';
import { LoginValueModel, UserDetails, UserLoginVallues } from '../models/user-reg-model';
import { Router, RouterLink } from '@angular/router';
import { LoginDetail, LoginResponse } from '../models/login-model';
import { AdminLoginData, adminLoginRes, adminlogin } from '../models/admin-login-model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSrvcService implements OnInit {

  http: HttpClient = inject(HttpClient);

  showSearchBox: boolean = true;
  showCart: boolean = false;
  isLogged: boolean = false;
  usrname: string;
  adminname: string;


  adminLoginValues: AdminLoginData[] = [{
    adminUsername: 'rifash', adminPassword: '1122'
  }];

  ngOnInit(): void {
    const token: string = localStorage.getItem('userToken');
    if (token) {
      this.isLogged = true;
    }
  }
  constructor(private router: Router, private toast: ToastrService) {
  }

  logindatas: object[] = [];
  user: LoginValueModel[] = [];
  userlogin: LoginDetail[] = [];
  adminLoginValue: AdminLoginData[] = [];
  userId: string = ''

  signUp(formValue: NgForm, file: File) {
    const formData = new FormData();
    formData.append('name', formValue.value.regName);
    formData.append('profileImg', file);
    formData.append('usrname', formValue.value.regusername);
    formData.append('email', formValue.value.regEmail);
    formData.append('password', formValue.value.regPassword);
    formData.append('confirmPassword', formValue.value.regrePassword);
    return this.http.post('http://localhost:3000/api/users/signup', formData)
  }

  emptyStorage() {
    localStorage.removeItem('signUpUsers');
  }

  login(userValues: UserLoginVallues) {

    this.http.post('http://localhost:3000/api/users/login', userValues).subscribe((res: LoginResponse) => {
      if (res.status === "Valid") {
        this.userId = res.user._id;
        localStorage.setItem('username', res.user.name);
        this.usrname = localStorage.getItem('username');
        if (this.usrname) {
          this.showCart = true;
          // this.isLogged = true;
        }
        localStorage.setItem('userId', res.user._id);
        localStorage.setItem('userToken', res.token);
        this.toast.success("Log in Success");
        this.router.navigate(['all-products']);
      }
    }, (err) => {
      this.showCart = false;
      this.toast.error('Not Authorized')
    })
  }

  allUsers(): Observable<object> {
    return this.http.get('http://localhost:3000/api/admin/users')
  }

  adminLogin(adminName: string, adminPassword: string) {
    let values: adminlogin = {
      username: adminName,
      password: adminPassword
    }
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json'
    })
    this.http.post('http://localhost:3000/api/admin/login', values).subscribe((res: adminLoginRes) => {
      if (res.token) {
        this.adminname = res.name;
        localStorage.setItem('token', res.token);
        this.toast.success('Admin Accessed');
        this.router.navigate(['admin-dashboard']);
      } else {
      }
    }, (err) => {
      this.toast.error('You are not the real one')
    })

  }

}
