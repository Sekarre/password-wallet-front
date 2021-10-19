import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../domain/User';
import {Observable} from 'rxjs';
import {Password} from '../domain/Password';
import {PasswordChangeDto} from '../domain/dto/PasswordChangeDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDataUrl = 'http://localhost:8080/api/auth/user-data';
  changePasswordUrl = 'http://localhost:8080/api/auth/password-change';

  constructor(private http: HttpClient) {
  }

  getUserData(): Observable<User> {
    return this.http.get<User>(this.userDataUrl)
  }

  changePassword(passwordChange: PasswordChangeDto): Observable<any> {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(passwordChange);
    console.log(body)
    return this.http.post(this.changePasswordUrl, body, {headers})
  }
}
