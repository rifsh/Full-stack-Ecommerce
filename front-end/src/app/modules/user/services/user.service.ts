import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = 'https://full-stack-ecommerce-3-7ygl.onrender.com/api/users/';

  constructor(private http: HttpClient) { }


  getUserById(): Observable<object> {
    const userId: string = localStorage.getItem('userId')
    return this.http.get(`${this.userUrl}user/${userId}`)
  }
}
