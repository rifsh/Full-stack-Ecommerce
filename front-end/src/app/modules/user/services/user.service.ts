import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserById(): Observable<object> {
    const userId: string = localStorage.getItem('userId')
    return this.http.get(`http://localhost:3000/api/users/user/${userId}`)
  }
}
