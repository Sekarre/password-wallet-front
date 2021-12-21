import {Component, OnInit} from '@angular/core';
import {LogInfo} from '../../domain/LogInfo';
import {LogInfoService} from '../../services/log-info.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logInfo: LogInfo;

  constructor(private logInfoService: LogInfoService) {
  }

  ngOnInit(): void {
    this.logInfoService.getLogInfo().subscribe(data => this.logInfo = data);
  }
}
