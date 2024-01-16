import { Component,inject,ViewChild } from '@angular/core';
import { UserSrvcService } from '../core/services/user-srvc.service';
import { NgForm } from '@angular/forms';
import { LoginDetail } from '../core/models/login-model';
import { UserLoginVallues } from '../core/models/user-reg-model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginarr:LoginDetail[]=[]

  srvc:UserSrvcService = inject(UserSrvcService);

  @ViewChild('logForm') logForm:NgForm

  onLogin() {
    const userValues: UserLoginVallues = {
      username: this.logForm.value.userName,
      password: this.logForm.value.password
    }
    this.srvc.login(userValues);
    this.logForm.reset()
}
}
