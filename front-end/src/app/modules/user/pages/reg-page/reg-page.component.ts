import { Component, ViewChild, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSrvcService } from 'src/app/core/services/user-srvc.service';


@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.css']
})
export class RegPageComponent implements OnInit {

  hide: boolean = false;
  confirmPasswordHide: boolean = false;
  srvc: UserSrvcService = inject(UserSrvcService);
  route: Router = inject(Router);
  toast: ToastrService = inject(ToastrService);
  loading: boolean = false;

  files: File = null
  @ViewChild('regForm') regForm: NgForm;


  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  togglingPasswordView(inputType: string) {
    if (inputType == 'password') {
      this.hide = !this.hide;
    } else if (inputType == 'repassword') {
      this.confirmPasswordHide = !this.confirmPasswordHide;
    }
  }

  selectImage(event) {
    this.regForm.value.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.files = <File>event.target.files[0];
      this.regForm.value.image = this.files;
    }
  }

  onFormSubmitted() {
    this.loading = true;
    this.srvc.signUp(this.regForm, this.files).subscribe((res) => {
      if (res) {
        this.loading = false;
        this.toast.success("Successfully registered");
        this.router.navigate(['/login'])
      }
    }, (err) => {
      this.toast.warning("Something went wrong");
      console.log(err);

    })
    this.regForm.reset({
      email: null,
      username: null,
      password: null
    })
  }


  removeUserds() {
    this.srvc.emptyStorage();
  }

}
