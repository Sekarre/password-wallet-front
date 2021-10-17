import { Component, OnInit } from '@angular/core';
import {Password} from '../../domain/Password';
import {PasswordService} from '../../services/password.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked = true;
  public clicked1 = false;
  public clicked2 = false;

  passwordList: Password[] = [];

  constructor(private passwordService: PasswordService) {}

  ngOnInit() {
      this.passwordService.getPasswords().subscribe(data => this.passwordList = data);
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
}
