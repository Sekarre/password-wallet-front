import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        login: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        password: new FormControl('',
          [Validators.required, Validators.minLength(2)])
      })
    });
  }

  login() {
    console.log(this.loginFormGroup.get('user')?.value);

    this.authService.login(this.loginFormGroup.get('user').get('login').value, this.loginFormGroup.get('user').get('password').value)
      .subscribe(
        response => {
          this.authService.setToken(response.token)
        }
      );
  }

  logout() {
    this.authService.logout();
  }
}
