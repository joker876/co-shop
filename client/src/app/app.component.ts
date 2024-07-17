import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthLoginRequest, AuthLoginResponse } from '../../../shared/interfaces/auth/login';
import { AuthLogoutRequest, AuthLogoutResponse } from '../../../shared/interfaces/auth/logout';
import { AuthRegisterRequest, AuthRegisterResponse } from './../../../shared/interfaces/auth/register';
import { HttpService } from './services/http/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  providers: [HttpClient, HttpService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly http = inject(HttpService);

  readonly email = signal(localStorage.getItem('TEMP-email') ?? '');
  readonly username = signal(localStorage.getItem('TEMP-username') ?? '');
  readonly password = signal(localStorage.getItem('TEMP-password') ?? '');

  constructor() {
    effect(() => {
      localStorage.setItem('TEMP-email', this.email());
    });
    effect(() => {
      localStorage.setItem('TEMP-username', this.username());
    });
    effect(() => {
      localStorage.setItem('TEMP-password', this.password());
    });
  }

  sendRegister() {
    this.http
      .post<AuthRegisterRequest, AuthRegisterResponse>('http://localhost:6022/api/auth/register', {
        email: this.email(),
        username: this.username(),
        password: this.password(),
      })
      .subscribe(res => {
        console.log(res);
      });
  }
  sendLogin() {
    this.http
      .post<
        AuthLoginRequest,
        AuthLoginResponse
      >('http://localhost:6022/api/auth/login', { email: this.email(), password: this.password() })
      .subscribe(res => {
        console.log(res);
      });
  }
  sendLogout() {
    this.http
      .post<AuthLogoutRequest, AuthLogoutResponse>('http://localhost:6022/api/auth/logout', null)
      .subscribe(res => {
        console.log(res);
      });
  }
}
