import {Component, OnInit} from '@angular/core';
import {LogInfoService} from '../../services/log-info.service';
import {LogIpInfo} from '../../domain/LogIpInfo';
import {AlertService} from '../../services/alert.service';
import {COMMON_ERROR_MESSAGE, IP_ADDRESS_BANNED, IP_ADDRESS_UNBANNED} from '../../domain/CommonMessages';
import {Error} from '../../domain/Error';

@Component({
  selector: 'app-login-settings',
  templateUrl: './login-settings.component.html',
  styleUrls: ['./login-settings.component.scss']
})
export class LoginSettingsComponent implements OnInit {

  logIpInfo: LogIpInfo[];

  constructor(private logInfoService: LogInfoService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.logInfoService.getLogIpInfo().subscribe(data => this.logIpInfo = data);
  }

  banIpAddress(ipAddress: string) {
    this.logInfoService.banIpAddress(ipAddress).subscribe(
      () => {
        this.alertService.success(IP_ADDRESS_BANNED);
        this.logInfoService.getLogIpInfo().subscribe(data => this.logIpInfo = data);
      },
      err => {
        const errorParsed = JSON.parse(JSON.stringify(err.error)) as Error;
        const errorMessage: string = !errorParsed.message ? COMMON_ERROR_MESSAGE : errorParsed.message;

        this.alertService.error(errorMessage);
      });
  }

  unbanIpAddress(ipAddress: string) {
    this.logInfoService.unbanIpAddress(ipAddress).subscribe(
      () => {
        this.alertService.success(IP_ADDRESS_UNBANNED);
        this.logInfoService.getLogIpInfo().subscribe(data => this.logIpInfo = data);
      },
      err => {
        const errorParsed = JSON.parse(JSON.stringify(err.error)) as Error;
        const errorMessage: string = !errorParsed.message ? COMMON_ERROR_MESSAGE : errorParsed.message;

        this.alertService.error(errorMessage);
      });
  }
}
