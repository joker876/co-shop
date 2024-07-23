import { Routes } from '@angular/router';
import { LoginPage } from './features/login/login.page';
import { RegisterStep1FormComponent } from './features/register/register-step1-form/register-step1-form.component';
import { RegisterStep2FormComponent } from './features/register/register-step2-form/register-step2-form.component';
import { RegisterPage } from './features/register/register.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: 'register',
    component: RegisterPage,
    children: [
      { path: '', component: RegisterStep1FormComponent },
      { path: 'set-name', component: RegisterStep2FormComponent },
    ],
  },
];
