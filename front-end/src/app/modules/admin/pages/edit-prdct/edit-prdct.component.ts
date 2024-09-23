import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Genre, ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';

@Component({
  selector: 'app-edit-prdct',
  templateUrl: './edit-prdct.component.html',
  styleUrls: ['./edit-prdct.component.css']
})
export class EditPrdctComponent implements OnInit {

  @ViewChild('editprdctForm') editForm: NgForm;
  toast: ToastrService = inject(ToastrService);
  imageSrc: string | ArrayBuffer | null = null;
  selectedGenre: string = ''
  file: File = null
  prdcts: ResponseProductView;
  prdctId: string;
  loading: boolean = false;
  genres: Genre[] = [];
  constructor(private srvc: AdminSrvcService, private routerValue: ActivatedRoute, private prdctSrvc: UserProductsService, private route: Router) {


  }

  ngOnInit(): void {
    this.fetchGenres()
    this.prdctId = this.routerValue.snapshot.paramMap.get('id');
    this.srvc.singleProduct(this.prdctId).subscribe((res: ResponseProduct) => {
      this.prdcts = res.datas;
      this.imageSrc = res.datas.image;
    }, (err) => {
      console.log(err);

    })

    setTimeout(() => {
      let img: string = this.prdcts.image;
      this.editForm.setValue({
        title: this.prdcts.title,
        author: this.prdcts.author,
        image: null,
        description: this.prdcts.description,
        category: this.prdcts.category,
        price: this.prdcts.price
      })

    }, 500);
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

  fetchGenres() {
    this.srvc.fetchGenres().subscribe({
      next: (res) => {
        this.genres = res.data
      }
    })
  }

  selectImage(eve) {
    this.editForm.value.image = eve.target.files[0];
    if (eve.target.files.length > 0) {
      this.file = <File>eve.target.files[0];
      this.editForm.value.image = this.file;
    }
  }

  editPrdct() {
    this.loading = true;
    this.srvc.editPrdct(this.prdctId, this.file, this.editForm).subscribe((res) => {
      this.toast.success("Success fully updated");
      this.loading = false;
    }, (err) => {
      this.loading = false;
      this.toast.warning("Something wrong");
      console.log(err);
    });

  }
}
