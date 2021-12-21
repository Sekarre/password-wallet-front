import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogInfo} from '../domain/LogInfo';
import {LogIpInfo} from '../domain/LogIpInfo';

@Injectable({
  providedIn: 'root'
})
export class LogInfoService {

  logInfoUrl = 'http://localhost:8080/api/auth/user-login-data';
  logIpInfoUrl = 'http://localhost:8080/api/auth/user-login-ip-data';
  banIpUrl = 'http://localhost:8080/api/auth/user-ip-ban?userIp=';
  unbanIpUrl = 'http://localhost:8080/api/auth/user-ip-unban?userIp=';

  constructor(private http: HttpClient) { }

  getLogInfo(): Observable<LogInfo> {
    return this.http.get<LogInfo>(this.logInfoUrl);
  }

  getLogIpInfo(): Observable<LogIpInfo[]> {
    return this.http.get<LogIpInfo[]>(this.logIpInfoUrl);
  }

  banIpAddress(ipAddress: string): Observable<any> {
    const url = this.banIpUrl + ipAddress;
    return this.http.patch<Observable<any>>(url, null);
  }

  unbanIpAddress(ipAddress: string): Observable<any> {
    const url = this.unbanIpUrl + ipAddress;
    return this.http.patch<Observable<any>>(url, null);
  }
}
