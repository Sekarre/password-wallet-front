import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserCredentials} from '../domain/UserCredentials';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  authUrl = 'http://localhost:8080/api/auth';
  registerUrl = 'http://localhost:8080/api/auth/new-account';

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
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  register(login: string, password: string, passwordType: string): Observable<any> {
    return this.http.post<TokenResponse>(this.registerUrl, {login, password, passwordType});
  }
}

interface TokenResponse {
  token: string
}

