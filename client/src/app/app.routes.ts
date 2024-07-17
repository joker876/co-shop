import { Routes } from '@angular/router';
import { LoginPage } from './features/login/login.page';
import { RegisterPage } from './features/register/register.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
];
