import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserCredentials} from '../domain/UserCredentials';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  authUrl = 'http://localhost:8080/api/auth';
  registerUrl = 'http://localhost:8080/api/auth/new-account';
  setupKeyUrl = 'http://localhost:8080/api/auth/key';

  constructor(private http: HttpClient) {
  }

  login(login: string, password: string): Observable<any> {

    const userCredentials = new UserCredentials();
    userCredentials.login = login;
    userCredentials.password = password;

    return this.http.post<TokenResponse>(`${this.authUrl}`, userCredentials);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('key');
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  setPasswordKeyStorage() {
    sessionStorage.setItem('key', 'true');
  }

  getPasswordKeyStorage(): string {
    return sessionStorage.getItem('key');
  }

  flushPasswordKeyStorage(): void {
    return sessionStorage.removeItem('key');
  }

  register(login: string, password: string, passwordType: string): Observable<any> {
    return this.http.post<TokenResponse>(this.registerUrl, {login, password, passwordType});
  }

  setPasswordKey(passwordKey: string): Observable<any> {
    return this.http.post<TokenResponse>(this.setupKeyUrl, {passwordKey});
  }
}

interface TokenResponse {
  token: string
}

