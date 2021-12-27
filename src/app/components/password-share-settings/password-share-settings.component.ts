import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {PasswordService} from '../../services/password.service';
import {SharedPassword} from '../../domain/SharedPassword';

@Component({
  selector: 'app-password-share-settings',
  templateUrl: './password-share-settings.component.html',
  styleUrls: ['./password-share-settings.component.scss']
})
export class PasswordShareSettingsComponent implements OnInit {

  sharedPasswords: SharedPassword[];

  constructor(private alertService: AlertService,
              private passwordService: PasswordService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  removeSharing(sharedPasswordId: number) {
    this.passwordService.deletePasswordSharing(sharedPasswordId).subscribe(
      () => {
        this.alertService.success('Sharing removed');
        this.loadData();
      },
      () => this.alertService.error('Error while removing sharing'));
  }

  loadData() {
    this.passwordService.getSharedToPasswords().subscribe(
      (data) => this.sharedPasswords = data,
      () => this.alertService.error('Error while getting shared passwords')
    );
  }
}
