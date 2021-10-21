import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {PasswordService} from '../../services/password.service';

@Component({
  selector: 'app-key-set',
  templateUrl: './key-set.component.html',
  styleUrls: ['./key-set.component.scss']
})
export class KeySetComponent implements OnInit {

  setupPasswordKeyFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private passwordService: PasswordService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.setupPasswordKeyFormGroup = this.formBuilder.group({
      keySet: this.formBuilder.group({
        passwordKey: new FormControl('',
          [Validators.required, Validators.minLength(2)])
      })
    });
  }

  setupPasswordKey() {
    const key: string = this.setupPasswordKeyFormGroup.get('keySet').get('passwordKey').value;
    this.passwordService.checkIfKeyValid(key).subscribe(() => {
        this.authService.setPasswordKey(key).subscribe(
          response => {
            this.authService.setPasswordKeyStorage();
            this.authService.setToken(response.token);
            this.router.navigateByUrl('/dashboard');
          }, error => {
            this.alertService.error('Error');
          })
      },
      error => {
        this.alertService.error('Key is not valid. Try again');
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
