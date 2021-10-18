import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-key-set',
  templateUrl: './key-set.component.html',
  styleUrls: ['./key-set.component.scss']
})
export class KeySetComponent implements OnInit {

  setupPasswordKeyFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
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
    this.authService.setPasswordKey(this.setupPasswordKeyFormGroup.get('keySet').get('passwordKey').value)
      .subscribe(
        response => {
          this.authService.setPasswordKeyStorage();
          this.authService.setToken(response.token);
          this.router.navigateByUrl('/dashboard');
        }
      );
  }

  logout() {
    this.authService.logout();
  }
}
