import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../services/password.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Password} from '../../domain/Password';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent implements OnInit {

  passwordChangeFormGroup: FormGroup;
  passwordToEdit: Password = new Password();
  fieldTextType: boolean;

  constructor(private passwordService: PasswordService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
      console.log(params);
      this.passwordService.getPassword(Number(params.get('id'))).subscribe(
        data => {
          this.passwordToEdit = data

        }
      );
      this.initializeForm();

    });
  }

  private initializeForm() {
    this.passwordChangeFormGroup = this.formBuilder.group({
      editPassword: this.formBuilder.group({
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

  editPassword() {
    const password = this.createPasswordObject();
    console.log(password);
    this.passwordService.editPassword(password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/dashboard');
        }
      );
  }

  private createPasswordObject(): Password {
    this.passwordToEdit.password = this.passwordChangeFormGroup.get('editPassword').get('password').value;
    this.passwordToEdit.login = this.passwordChangeFormGroup.get('editPassword').get('login').value;
    this.passwordToEdit.title = this.passwordChangeFormGroup.get('editPassword').get('title').value;
    this.passwordToEdit.description = this.passwordChangeFormGroup.get('editPassword').get('description').value;
    this.passwordToEdit.webAddress = this.passwordChangeFormGroup.get('editPassword').get('webAddress').value;

    return this.passwordToEdit;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
