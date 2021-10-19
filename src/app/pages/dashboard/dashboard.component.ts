import {Component, OnInit} from '@angular/core';
import {Password} from '../../domain/Password';
import {PasswordService} from '../../services/password.service';
import {ControlHelperService} from '../../services/control-helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public data: any;
  public clicked = true;

  passwordList: Password[] = [];

  constructor(private passwordService: PasswordService,
              private controlHelperService: ControlHelperService,
              private router: Router) {
  }

  ngOnInit() {
    this.passwordService.getPasswords().subscribe(data => this.passwordList = data);
  }

  showPassword(passwordId: number) {
    if (this.controlHelperService.isKeyPasswordSet()) {
      this.passwordService.getPassword(passwordId).subscribe(data => {
        const password = this.passwordList.find(p => p.id === data.id)
        password.password = data.password;
      });
    }
  }

  deletePassword(passwordId: number) {
    if (this.controlHelperService.isKeyPasswordSet()) {
      this.passwordService.deletePassword(passwordId).subscribe();
      this.router.navigateByUrl('/dashboard');
    }
  }
}
