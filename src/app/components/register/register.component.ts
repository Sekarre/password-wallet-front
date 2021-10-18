import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PasswordType} from '../../domain/PasswordType';
import {PasswordService} from '../../services/password.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginFormGroup: FormGroup;
  passwordTypes: PasswordType[] = [];
  selected: string;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private passwordService: PasswordService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.passwordService.getPasswordTypes().subscribe(data => {
      this.passwordTypes = data;

      if (data.length !== 0) {
        this.selected = data[0].name;
      }
    });

    this.loginFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        login: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        password: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        passwordType: new FormControl('',
          [Validators.required, Validators.minLength(2)])
      })
    });
  }

  register() {
    console.log(this.loginFormGroup.get('user')?.value);

    this.authService.register(
      this.loginFormGroup.get('user').get('login').value,
      this.loginFormGroup.get('user').get('password').value,
      this.loginFormGroup.get('user').get('passwordType').value.name).subscribe({
        next: response => {
          this.authService.setToken(response.token);
          this.redirectToDashboard();
        },
        error: err => {
          alert(`Invalid data given`);
        }
      }
    );
  }

  private redirectToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}
