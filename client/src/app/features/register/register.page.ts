import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ArdiumButtonModule,
  ArdiumCardModule,
  ArdiumPasswordInputModule,
  ArdiumSimpleInputModule,
  ArdiumSpinnerModule,
} from '@ardium-ui/ui';
import { HttpService } from '@services/http';
import { customValidators } from '@utils/form-utils';
import { catchError, retry, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ArdiumCardModule,
    ArdiumSimpleInputModule,
    ArdiumPasswordInputModule,
    ArdiumButtonModule,
    ArdiumSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPage implements OnDestroy {
  private readonly http = inject(HttpService);
  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  readonly isRegisterPending = signal<boolean>(false);
  readonly registerErrorResponse = signal<string | null>(null);

  readonly form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, customValidators.email]),
    username: new FormControl<string>('', [Validators.required, Validators.maxLength(48), Validators.minLength(1)]),
    password: new FormControl<string>('', [Validators.required]),
  });

  onFormSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isRegisterPending.set(true);
    const sub = this.http
      .post('auth/register', this.form.value, {})
      .pipe(
        takeUntil(this.destroy$),
        retry(0),
        catchError((err, caught) => {
          this.isRegisterPending.set(false);
          console.log(err.error);
          sub.unsubscribe();
          return caught;
        })
      )
      .subscribe(res => {
        this.isRegisterPending.set(false);
        console.log(res);
      });
  }
}
