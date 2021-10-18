import {Component, OnInit} from '@angular/core';
import {Password} from '../../domain/Password';
import {PasswordService} from '../../services/password.service';
import {ActivatedRoute} from '@angular/router';
import {ControlHelperService} from '../../services/control-helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked = true;

  passwordList: Password[] = [];

  constructor(private passwordService: PasswordService,
              private controlHelperService: ControlHelperService) {
  }

  ngOnInit() {
    this.passwordService.getPasswords().subscribe(data => this.passwordList = data);
  }

  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }

  showPassword(passwordId: number) {
    if (this.controlHelperService.isKeyPasswordSet()) {
        this.passwordService.getPassword(passwordId).subscribe(data => {
          const password = this.passwordList.find(p => p.id === data.id)
          password.password = data.password;
        });
    }
  }
}
