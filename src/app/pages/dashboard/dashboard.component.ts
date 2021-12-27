import {Component, OnInit} from '@angular/core';
import {Password} from '../../domain/Password';
import {PasswordService} from '../../services/password.service';
import {ControlHelperService} from '../../services/control-helper.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {SharedPassword} from '../../domain/SharedPassword';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public data: any;
  public clicked = true;
  public editMode = false;

  display = 'none';
  selectedModalPasswordId;

  modalPasswordGroup: FormGroup;

  passwordList: Password[] = [];
  sharedPasswordList: SharedPassword[] = [];
  fakePassword = '*******';

  constructor(private passwordService: PasswordService,
              private controlHelperService: ControlHelperService,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit() {
    this.modalPasswordGroup = this.formBuilder.group({
      email: new FormControl('',
        [Validators.required, Validators.minLength(2)]),
    });

    this.passwordService.getPasswords().subscribe(data2 => this.passwordList = data2);
    this.passwordService.getSharedFromPasswords().subscribe(data2 => this.sharedPasswordList = data2);
  }

  changeMode() {
    this.editMode = !this.editMode;
  }

  showPassword(passwordId: number) {
    this.passwordService.getPassword(passwordId).subscribe(data => {
      const password = this.passwordList.find(p => p.id === data.id)
      this.setFrontPassword(password, data);
    });
  }

  showSharedPassword(passwordId: number) {
    this.passwordService.getSharedPassword(passwordId).subscribe(data => {
      const password = this.sharedPasswordList.find(p => p.id === data.id)
      this.setFrontPassword(password, data);
    });
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

  openModal(passwordId: number) {
    this.display = 'block';
    this.selectedModalPasswordId = passwordId;
  }

  onCloseHandled() {
    this.display = 'none';
    this.selectedModalPasswordId = null;
  }

  sharePassword() {
    this.passwordService.sharePassword(this.modalPasswordGroup.get('email').value, this.selectedModalPasswordId).subscribe(() => {
      this.onCloseHandled();
      this.alertService.success('Password has been shared to: ' + this.modalPasswordGroup.get('email').value);
    }, () => {
      this.alertService.error('Error while sharing the password');
    });
  }
}
