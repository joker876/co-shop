import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly http = inject(HttpClient);

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
      .post(
        'http://localhost:6022/api/auth/register',
        {
          email: this.email(),
          username: this.username(),
          password: this.password(),
        },
        { withCredentials: true }
      )
      .subscribe(res => {
        console.log(res);
      });
  }
  sendLogin() {
    this.http
      .post(
        'http://localhost:6022/api/auth/login',
        { email: this.email(), password: this.password() },
        { withCredentials: true }
      )
      .subscribe(res => {
        console.log(res);
      });
  }
  sendLogout() {
    this.http.post('http://localhost:6022/api/auth/logout', null, { withCredentials: true }).subscribe(res => {
      console.log(res);
    });
  }
}
