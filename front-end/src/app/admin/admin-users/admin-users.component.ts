import { Component } from '@angular/core';
import { LoginDetail } from 'src/app/core/models/login-model';
import { LoginValueModel, MainUser, UserDetails } from 'src/app/core/models/user-reg-model';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

  // users: LoginValueModel[] = [];
  userlow: MainUser[] = [];
  
  constructor(private srvc: UserSrvcService) {
    srvc.allUsers().subscribe((res: UserDetails) => {
      this.userlow = res.datas;
    }, (err) => {
      console.log(err.message);
    });
    // this.users = srvc.user;
  }

}
