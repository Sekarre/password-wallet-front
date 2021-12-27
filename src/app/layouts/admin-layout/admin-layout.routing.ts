import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {LoginComponent} from '../../components/login/login.component';
import {AuthGuard} from '../../services/AuthGuard';
import {RegisterComponent} from '../../components/register/register.component';
import {PasswordAddComponent} from '../../components/password-add/password-add.component';
import {KeySetComponent} from '../../components/key-set/key-set.component';
import {PasswordEditComponent} from '../../components/password-edit/password-edit.component';
import {LogsComponent} from '../../components/logs/logs.component';
import {LoginSettingsComponent} from '../../components/login-settings/login-settings.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard]  },
  { path: 'login-settings', component: LoginSettingsComponent, canActivate: [AuthGuard]  },
  { path: 'password-add', component: PasswordAddComponent, canActivate: [AuthGuard] },
  { path: 'password-edit/:id', component: PasswordEditComponent, canActivate: [AuthGuard] },
  { path: 'key-set', component: KeySetComponent, canActivate: [AuthGuard] }
];
