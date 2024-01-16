import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { UserSrvcService } from '../core/services/user-srvc.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.css']
})
export class RegPageComponent implements OnInit {

  hide: boolean = true;
  srvc: UserSrvcService = inject(UserSrvcService);
  route: Router = inject(Router);
  toast:ToastrService = inject(ToastrService)

  files: File = null
  @ViewChild('regForm') regForm: NgForm;


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  selectImage(event) {
    this.regForm.value.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.files = <File>event.target.files[0];
      this.regForm.value.image = this.files;
    }
  }

  onFormSubmitted() {
    this.srvc.signUp(this.regForm, this.files).subscribe((res) => {
      this.toast.success('Success')
      if (res) {
        alert("Successfully sighned");
      }
    }, (err) => {
      this.toast.warning("Something went wrong")
    })
    // this.regForm.reset({
    //   email: null,
    //   username: null,
    //   password: null
    // })
  }


  removeUserds() {
    this.srvc.emptyStorage();
  }

}
