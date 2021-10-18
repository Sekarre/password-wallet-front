import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../domain/User';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDataUrl = 'http://localhost:8080/api/auth/user-data';

  constructor(private http: HttpClient) {
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(this.userDataUrl)
  }
}
