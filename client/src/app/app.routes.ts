import { Routes } from '@angular/router';
import { HomePage } from './features/home/home.page';
import { RegisterStep1FormComponent } from './features/register/register-step1-form/register-step1-form.component';
import { RegisterStep2FormComponent } from './features/register/register-step2-form/register-step2-form.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/app-container/app-container.component').then(v => v.AppContainerComponent),
    children: [{ path: '', component: HomePage }],
  },
  { path: 'login', loadComponent: () => import('./features/login/login.page').then(v => v.LoginPage) },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.page').then(v => v.RegisterPage),
    children: [
      { path: '', component: RegisterStep1FormComponent },
      { path: 'set-name', component: RegisterStep2FormComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
