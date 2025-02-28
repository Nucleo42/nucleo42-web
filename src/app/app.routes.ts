import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { provideStates } from '@ngxs/store';
import { RegisterUserState } from './state/user/registerUser/register.states';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    providers: [provideStates([RegisterUserState])],
  },

  {
    path: 'layout',
    component: LayoutComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
