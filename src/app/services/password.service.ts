import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Password} from '../domain/Password';
import {Observable} from 'rxjs';
import {PasswordType} from '../domain/PasswordType';
import {SharedPassword} from '../domain/SharedPassword';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  baseURL = 'http://localhost:8080/api/password-wallet';
  passwordTypesUrl = 'http://localhost:8080/api/password-wallet/password-types';
  passwordKeyUrl = 'http://localhost:8080/api/password-wallet/password-key-verification';
  sharedPasswordUrl = 'http://localhost:8080/api/password-wallet/shared-passwords/shared-from';
  sharedToPasswordUrl = 'http://localhost:8080/api/password-wallet/shared-passwords/shared-to';
  baseSharePasswordUrl = 'http://localhost:8080/api/password-wallet/shared-passwords';

  constructor(private http: HttpClient) {
  }

  getPasswords(): Observable<Password[]> {
    return this.http.get<Password[]>(this.baseURL)
  }

  getSharedFromPasswords(): Observable<SharedPassword[]> {
    return this.http.get<SharedPassword[]>(this.sharedPasswordUrl)
  }

  getSharedToPasswords(): Observable<SharedPassword[]> {
    return this.http.get<SharedPassword[]>(this.sharedToPasswordUrl)
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

    return this.http.put(url, body, {headers})
  }

  getPasswordTypes(): Observable<PasswordType[]> {
    return this.http.get<PasswordType[]>(this.passwordTypesUrl)
  }

  getPassword(passwordId: number) {
    const url = this.baseURL + '/' + passwordId;

    return this.http.get<Password>(url);
  }

  getSharedPassword(passwordId: number) {
    const url = this.baseSharePasswordUrl + '/' + passwordId;

    return this.http.get<Password>(url);
  }

  deletePassword(passwordId: number) {
    const url = this.baseURL + '/' + passwordId;

    return this.http.delete(url);
  }

  deletePasswordSharing(passwordId: number) {
    const url = this.baseSharePasswordUrl + '/' + passwordId;

    return this.http.delete(url);
  }

  checkIfKeyValid(key) {
    const headers = {'content-type': 'application/json'}
    return this.http.post(this.passwordKeyUrl, key, {headers});
  }

  sharePassword(email: string, passwordId: number) {
    const url = this.baseSharePasswordUrl + '/' + passwordId + '?userEmail=' + email;
    return this.http.post(url, null);
  }
}
