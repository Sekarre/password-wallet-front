import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../services/password.service';
import {User} from '../../domain/User';
import {UserService} from '../../services/user.service';
import {PasswordType} from '../../domain/PasswordType';
import {PasswordChangeDto} from '../../domain/dto/PasswordChangeDto';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';

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
    private passwordService: PasswordService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.passwordService.getPasswordTypes().subscribe(data => {
      this.passwordTypes = data;
    });

    this.userService.getUserData().subscribe(data => {
      this.user = data;
    });
  }

  initializeForm() {
    this.userPasswordFormGroup = this.formBuilder.group({
      userDetails: this.formBuilder.group({
        login: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        currentPassword: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        newPassword: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        passwordType: new FormControl('',
          [Validators.required, Validators.minLength(2)])
      })
    });
  }

  changePassword() {
    this.userService.changePassword(this.createPasswordChangeDto()).subscribe({
        next: response => {
          this.authService.setToken(response.token);
          this.router.navigateByUrl('/dashboard');
        },
        error: err => {
          this.alertService.error(`Current password is not valid`);
        }
      }
    );
  }

  private createPasswordChangeDto(): PasswordChangeDto {
    const passwordChangeDto = new PasswordChangeDto();
    passwordChangeDto.currentPassword = this.userPasswordFormGroup.get('userDetails').get('currentPassword').value;
    passwordChangeDto.newPassword = this.userPasswordFormGroup.get('userDetails').get('newPassword').value;
    passwordChangeDto.passwordType = this.userPasswordFormGroup.get('userDetails').get('passwordType').value;

    return passwordChangeDto;
  }
}
