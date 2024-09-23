import { Injectable, inject } from '@angular/core';
import { UserProductsService } from './user-products.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { GenreResponse, ResponseProduct } from '../models/allproducts.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSrvcService {
  prdctsId: number = 0;
  editForm: NgForm;
  http: HttpClient = inject(HttpClient);
  url: string = 'https://full-stack-ecommerce-3-7ygl.onrender.com/api/admin/';

  constructor(private srvc: UserProductsService, private toast: ToastrService) { }


  getProducts(): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`http://localhost:3000/api/admin/products`)
  }

  addProducts(formValues: NgForm, file: File): Observable<object> {
    const formImg = new FormData();
    formImg.append('title', formValues.value.title);
    formImg.append('image', file);
    formImg.append('description', formValues.value.description);
    formImg.append('category', formValues.value.category);
    formImg.append('author', formValues.value.author);
    formImg.append('price', formValues.value.price);
    console.log(formImg.getAll('category'));

    return this.http.post('http://localhost:3000/api/admin/addproducts', formImg)
  }

  removeProducts(prdctId: string): Observable<object> {
    return this.http.delete(`http://localhost:3000/api/admin/deleteproduct/${prdctId}`)
  }

  singleProduct(id: string): Observable<object> {
    return this.http.get(`http://localhost:3000/api/admin/productbyid/${id}`)
  }

  editPrdct(id: string, file: File, formValues: NgForm): Observable<object> {
    let formDatas = new FormData();
    formDatas.append('title', formValues.value.title);
    formDatas.append('image', file);
    formDatas.append('description', formValues.value.description);
    formDatas.append('category', formValues.value.category);
    formDatas.append('author', formValues.value.author);
    formDatas.append('price', formValues.value.price);

    return this.http.patch(`http://localhost:3000/api/admin/updateproduct/${id}`, formDatas);
  }

  addCategory(category: string): Observable<GenreResponse> {
    const genreName = { genreName: category };
    return this.http.post<GenreResponse>(`${this.url}add-genre`, genreName);

  }

  fetchGenres(): Observable<GenreResponse> {
    return this.http.get<GenreResponse>(`${this.url}get-all-genres`).pipe(
      retry(10)
    )
  }

  deleteGenre(id: string): Observable<object> {
    return this.http.delete(`http://localhost:3000/api/admin/delete-genres/${id}`)
  }
}
