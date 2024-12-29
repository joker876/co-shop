import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/app-container/app-container.component').then(v => v.AppContainerComponent),
    children: [
      { path: '', loadComponent: () => import('./features/home/home.page').then(v => v.HomePage) },
      { path: 'list/:listId', loadComponent: () => import('./features/list/list.page').then(v => v.ListPage) },
    ],
  },
  { path: 'login', loadComponent: () => import('./features/login/login.page').then(v => v.LoginPage) },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.page').then(v => v.RegisterPage),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/register/register-step1-form/register-step1-form.component').then(
            v => v.RegisterStep1FormComponent
          ),
      },
      {
        path: 'set-name',
        loadComponent: () =>
          import('./features/register/register-step2-form/register-step2-form.component').then(
            v => v.RegisterStep2FormComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
