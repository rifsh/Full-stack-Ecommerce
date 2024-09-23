import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Genre } from 'src/app/core/models/allproducts.model';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('categoryfrom') categoryForm: NgForm;
  genres: Genre[] = [];
  constructor(private productService: AdminSrvcService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.fetchGenres()
  }

  addCategory() {
    const name: string = this.categoryForm.value.category;
    this.productService.addCategory(this.categoryForm.value.category).subscribe({
      next: (res) => {
        if (res.message === 'Success') {
          this.categoryForm.reset();
          this.toast.success(`'${name}' Category added`)
          this.fetchGenres();
        } else {
          this.toast.info(`${name} already present`);
        }
      }, error: (err) => {
        console.log(err);
        this.toast.info(`${name} already present`);
      }
    })
  }

  fetchGenres() {
    this.productService.fetchGenres().subscribe({
      next: (res) => {
        this.genres = res.data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  deleteGenre(id: string) {
    this.productService.deleteGenre(id).subscribe({
      next: (res: { message: string }) => {
        if (res.message === 'Successfullt deleted') {
          this.toast.warning(res.message);
          this.fetchGenres()
        } else {
          this.toast.info('Something went wrong');
        }
        console.log(res);
      }, error: (err) => {
        this.toast.info('Something went wrong');
        console.log(err);
      }
    })
  }
}
