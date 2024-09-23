import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MainUser, UserById } from 'src/app/core/models/user-reg-model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userDetails: MainUser;
  editMode: boolean = false; // Initially, the fields are not editable
  private destroys$ = new Subject<MainUser>();
  constructor(private userSrvc: UserService, private service:UserSrvcService) {
  }

  ngOnInit(): void {
    this.service.showSearchBox = false;
    this.service.showCart = false;
    this.getUser()
  }

  getUser() {
    this.userSrvc.getUserById().pipe(takeUntil(this.destroys$)).subscribe((x: UserById) => {
      this.userDetails = x.data
    })
  }

  toggleEditMode() {
    this.editMode = !this.editMode;

  }

  submitButton() {

  }

  cancel() {
    this.toggleEditMode()
  }

  ngOnDestroy(): void {
    // this.destroys$.next();
    // this.destroys$.complete()
  }
}
