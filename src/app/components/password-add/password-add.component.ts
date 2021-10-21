import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {PasswordService} from '../../services/password.service';
import {Router} from '@angular/router';
import {Password} from '../../domain/Password';

@Component({
  selector: 'app-password-add',
  templateUrl: './password-add.component.html',
  styleUrls: ['./password-add.component.scss']
})
export class PasswordAddComponent implements OnInit {

  passwordAddFormGroup: FormGroup;

  constructor(private passwordService: PasswordService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.passwordAddFormGroup = this.formBuilder.group({
      newPassword: this.formBuilder.group({
        login: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        password: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        title: new FormControl('',
          [Validators.required, Validators.minLength(2)]),
        webAddress: new FormControl(''),
        description: new FormControl('')
      })
    });
  }

  addPassword() {
    console.log(this.passwordAddFormGroup.get('new-password')?.value);

    const password = this.createPasswordObject();

    this.passwordService.addPassword(password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/dashboard');
        }
      );
  }

  private createPasswordObject(): Password {
    const password = new Password();
    password.password = this.passwordAddFormGroup.get('newPassword').get('password').value;
    password.login = this.passwordAddFormGroup.get('newPassword').get('login').value;
    password.title = this.passwordAddFormGroup.get('newPassword').get('title').value;
    password.description = this.passwordAddFormGroup.get('newPassword').get('description').value;
    password.webAddress = this.passwordAddFormGroup.get('newPassword').get('webAddress').value;

    return password;
  }

}
