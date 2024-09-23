import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, shareReplay } from 'rxjs';
import { ResponseProduct } from 'src/app/core/models/allproducts.model';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<object> {
    return this.http.get('https://full-stack-ecommerce-3-7ygl.onrender.com/api/users/products').pipe(
      retry(10)
    )
  }

  getFilteredProducts(category: string): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`https://full-stack-ecommerce-3-7ygl.onrender.com/api/users/products-categories?genre=${category}`)
  }
}
