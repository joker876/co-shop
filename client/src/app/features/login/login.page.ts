import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ArdiumButtonModule,
  ArdiumCardModule,
  ArdiumPasswordInputModule,
  ArdiumSimpleInputModule,
} from '@ardium-ui/ui';
import { HttpService } from '@services/http';
import { customValidators } from '@utils/form-utils';
import { catchError, retry, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ArdiumCardModule,
    ArdiumSimpleInputModule,
    ArdiumPasswordInputModule,
    ArdiumButtonModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnDestroy {
  private readonly http = inject(HttpService);
  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly isLoginPending = signal<boolean>(false);
  readonly loginErrorResponse = signal<string | null>(null);

  readonly form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, customValidators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  onFormSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const sub = this.http
      .post('auth/login', this.form.value, {})
      .pipe(
        takeUntil(this.destroy$),
        retry(0),
        catchError((err, caught) => {
          console.log(err);
          sub.unsubscribe();
          return caught;
        })
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
