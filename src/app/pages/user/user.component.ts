import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../services/password.service';
import {User} from '../../domain/User';
import {UserService} from '../../services/user.service';
import {PasswordType} from '../../domain/PasswordType';
import {tap} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {

  user: User = new User();
  userPasswordFormGroup: FormGroup;
  passwordTypes: PasswordType[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private passwordService: PasswordService) {

  }

  ngOnInit(): void {
    this.passwordService.getPasswordTypes().subscribe(data => {
      this.passwordTypes = data;
    });

    this.userService.getUserData().subscribe(data => {
      this.user = data;
      this.initializeForm();

    });
  }

  initializeForm() {
    this.userPasswordFormGroup = this.formBuilder.group({
      userDetails: this.formBuilder.group({
        currentLogin: new FormControl(this.user.login,
          [Validators.required, Validators.minLength(2)]),
        currentPassword: new FormControl(this.user.password,
          [Validators.required, Validators.minLength(2)]),
        currentPasswordType: new FormControl(this.user.passwordType,
          [Validators.required, Validators.minLength(2)])
      })
    });
  }

  changePassword() {
    console.log(this.userPasswordFormGroup.get('userDetails').get('currentLogin').value)
    console.log(this.userPasswordFormGroup.get('userDetails').get('currentPassword').value)
    console.log(this.userPasswordFormGroup.get('userDetails').get('currentPasswordType').value);
  }
}
