import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Genre, ProductModel } from 'src/app/core/models/allproducts.model';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  genres: Genre[] = []
  imageSrc: string | ArrayBuffer | null = null;
  file: File = null;
  loading: boolean = false;
  selectedGenre:string;
  @ViewChild('prdctForm') formValues: NgForm;

  constructor(private srvc: AdminSrvcService, private productSrvc: UserProductsService, private toast: ToastrService) {

  }

  ngOnInit(): void {
      this.fetchGenre()
  }

  previewImage(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageSrc = reader.result;  // Set the image source to the result of the FileReader
      };

      reader.readAsDataURL(input.files[0]); // Read the selected image as a Data URL
    }
  }

  selectImage(event) {
    this.formValues.value.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
      this.formValues.value.image = this.file;
    }
  }

  fetchGenre() {
    this.srvc.fetchGenres().subscribe({
      next: (res) => {
        this.genres = res.data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  submit() {
    this.loading = true;
    this.srvc.addProducts(this.formValues, this.file).subscribe((res) => {
      this.toast.success("Product is added");
      this.loading = false;
      this.formValues.reset()
    }, (err) => {
      this.toast.warning("Something went wrong");
      console.log(err);
      this.loading = false;
    })
  }
}
