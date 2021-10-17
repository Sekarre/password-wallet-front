import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Password} from '../domain/Password';
import {Observable} from 'rxjs';
import {PasswordType} from '../domain/PasswordType';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  baseURL = 'http://localhost:8080/api/password-wallet';
  passwordTypesUrl = 'http://localhost:8080/api/password-wallet/password-types';

  constructor(private http: HttpClient) {
  }

  getPasswords(): Observable<Password[]> {
    return this.http.get<Password[]>(this.baseURL)
  }

  addPassword(password: Password): Observable<any> {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(password);
    console.log(body)
    return this.http.post(this.baseURL, body, {headers})
  }

  getPasswordTypes(): Observable<PasswordType[]> {
    return this.http.get<PasswordType[]>(this.passwordTypesUrl)
  }
}
