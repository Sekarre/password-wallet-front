import {Component, OnInit} from '@angular/core';
import {Password} from '../../domain/Password';
import {PasswordService} from '../../services/password.service';
import {ControlHelperService} from '../../services/control-helper.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public data: any;
  public clicked = true;

  passwordList: Password[] = [];
  fakePassword = '*******';

  constructor(private passwordService: PasswordService,
              private controlHelperService: ControlHelperService,
              private router: Router) {
  }

  ngOnInit() {
    this.passwordService.getPasswords().subscribe(data2 => this.passwordList = data2);
  }

  showPassword(passwordId: number) {
    if (this.controlHelperService.isKeyPasswordSet()) {
      this.passwordService.getPassword(passwordId).subscribe(data => {
        const password = this.passwordList.find(p => p.id === data.id)
        this.setFrontPassword(password, data);
      });
    }
  }

  deletePassword(passwordId: number) {
    if (this.controlHelperService.isKeyPasswordSet()) {
      this.passwordService.deletePassword(passwordId).subscribe();
      this.removePasswordFromList(passwordId);
      this.router.navigateByUrl('/dashboard');
    }
  }

  private setFrontPassword(password: Password, data: Password) {
    if (!password.passwordVisible) {
      password.password = data.password;
    } else {
      password.password = this.fakePassword;
    }

    password.passwordVisible = !password.passwordVisible;
  }

  private removePasswordFromList(passwordId: number) {
    const index = this.passwordList.indexOf(this.passwordList.find(p => p.id === passwordId));
    if (index !== -1) {
      this.passwordList.splice(index, 1);
    }
  }
}
