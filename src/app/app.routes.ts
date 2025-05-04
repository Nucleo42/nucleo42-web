import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'layout', component: LayoutComponent },

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'project',
    loadComponent: () => import('@app/pages/project-list/project-list.component').then((m) => m.ProjectListComponent),
  },
];
