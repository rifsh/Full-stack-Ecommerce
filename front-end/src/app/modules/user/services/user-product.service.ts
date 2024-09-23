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
    return this.http.get('http://localhost:3000/api/users/products').pipe(
      retry(10)
    )
  }

  getFilteredProducts(category: string): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`http://localhost:3000/api/users/products-categories?genre=${category}`)
  }
}
