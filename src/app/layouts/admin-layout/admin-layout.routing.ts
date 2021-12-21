import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {LoginComponent} from '../../components/login/login.component';
import {AuthGuard} from '../../services/AuthGuard';
import {RegisterComponent} from '../../components/register/register.component';
import {PasswordAddComponent} from '../../components/password-add/password-add.component';
import {KeySetGuard} from '../../services/KeySetGuard';
import {KeySetComponent} from '../../components/key-set/key-set.component';
import {PasswordEditComponent} from '../../components/password-edit/password-edit.component';
import {LogsComponent} from '../../components/logs/logs.component';
import {LoginSettingsComponent} from '../../components/login-settings/login-settings.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, KeySetGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard, KeySetGuard]  },
  { path: 'login-settings', component: LoginSettingsComponent, canActivate: [AuthGuard, KeySetGuard]  },
  { path: 'password-add', component: PasswordAddComponent, canActivate: [AuthGuard, KeySetGuard] },
  { path: 'password-edit/:id', component: PasswordEditComponent, canActivate: [AuthGuard, KeySetGuard] },
  { path: 'key-set', component: KeySetComponent, canActivate: [AuthGuard] }
];
