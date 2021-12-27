import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {PasswordAddComponent} from './password-add/password-add.component';
import {KeySetComponent} from './key-set/key-set.component';
import {PasswordEditComponent} from './password-edit/password-edit.component';
import {AlertComponent} from './alert/alert.component';
import {LogsComponent} from './logs/logs.component';
import {LoginSettingsComponent} from './login-settings/login-settings.component';
import { PasswordShareSettingsComponent } from './password-share-settings/password-share-settings.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, ReactiveFormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, LoginComponent, RegisterComponent, PasswordAddComponent,
    KeySetComponent, PasswordEditComponent, AlertComponent, LogsComponent, LoginSettingsComponent, PasswordShareSettingsComponent],
    exports: [FooterComponent, NavbarComponent, SidebarComponent, AlertComponent]
})
export class ComponentsModule {
}
