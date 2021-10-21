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
  passwordKeyUrl = 'http://localhost:8080/api/password-wallet/password-key-verification';

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

  editPassword(password: Password): Observable<any> {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(password);
    const url = this.baseURL + '/' + password.id;

    console.log(body)
    return this.http.put(url, body, {headers})
  }

  getPasswordTypes(): Observable<PasswordType[]> {
    return this.http.get<PasswordType[]>(this.passwordTypesUrl)
  }

  getPassword(passwordId: number) {
    const url = this.baseURL + '/' + passwordId;

    return this.http.get<Password>(url);
  }

  deletePassword(passwordId: number) {
    const url = this.baseURL + '/' + passwordId;

    return this.http.delete(url);
  }

  checkIfKeyValid(key) {
    const headers = {'content-type': 'application/json'}
    return this.http.post(this.passwordKeyUrl, key, {headers});
  }
}
