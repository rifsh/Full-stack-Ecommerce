import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ProductModel, ResponseProduct, ResponseProductView } from 'src/app/core/models/allproducts.model';
import { AdminSrvcService } from 'src/app/core/services/admin-srvc.service';
import { UserProductsService } from 'src/app/core/services/user-products.service';

@Component({
  selector: 'app-edit-prdct',
  templateUrl: './edit-prdct.component.html',
  styleUrls: ['./edit-prdct.component.css']
})
export class EditPrdctComponent implements OnInit {

  @ViewChild('editprdctForm') editForm: NgForm;
  toast:ToastrService =  inject(ToastrService);

  file: File = null
  prdcts: ResponseProductView;
  prdctId: string;
  constructor(private srvc: AdminSrvcService, private routerValue: ActivatedRoute, private prdctSrvc: UserProductsService, private route: Router) {
    

  }

  ngOnInit(): void {
    this.prdctId = this.routerValue.snapshot.paramMap.get('id');
    console.log(this.prdctId);
    // let product = this.prdctSrvc.allProductsSrvc.find((x) => {
    //   return x.id
    // })
    // this.srvc.editForm = this.editForm;
    this.srvc.singleProduct(this.prdctId).subscribe((res: ResponseProduct) => {
      this.prdcts = res.datas
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

  selectImage(eve) {
    this.editForm.value.image = eve.target.files[0];
    if (eve.target.files.length > 0) {
      this.file = <File>eve.target.files[0];
      this.editForm.value.image = this.file;
    }
  }

  editPrdct() {
    this.srvc.editPrdct(this.prdctId, this.file, this.editForm).subscribe((res) => {
      this.toast.success("Success fully updated")
      this.route.navigate(['admin-products']);
    }, (err) => {
      console.log(err);
    });

  }
}
