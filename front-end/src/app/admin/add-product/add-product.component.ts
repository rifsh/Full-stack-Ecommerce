import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/core/models/allproducts.model';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  file: File = null;
  toast: ToastrService = inject(ToastrService)
  @ViewChild('prdctForm') formValues: NgForm;

  constructor(private srvc: AdminSrvcService, private productSrvc: UserProductsService) {

  }

  selectImage(event) {
    this.formValues.value.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.file = <File> event.target.files[0];
      this.formValues.value.image = this.file;
    }
  }

  submit() {
    this.srvc.addProducts(this.formValues, this.file).subscribe((res) => {
      this.toast.success("Product is added");
    }, (err) => {
      this.toast.warning("Something went wrong");
    })
    // this.formValues.reset()
  }
}
