import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ArdiumButtonModule,
  ArdiumCardModule,
  ArdiumPasswordInputModule,
  ArdiumSimpleInputModule,
  ArdiumSpinnerModule,
} from '@ardium-ui/ui';
import { AuthService } from '@services/auth';
import { customValidators } from '@utils/form-utils';
import { AuthRegisterRequest } from '../../../../../shared/interfaces/auth/register';

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
export class RegisterPage {
  private readonly authService = inject(AuthService);

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
    this.authService.executeRegister(this.form.value as AuthRegisterRequest);
  }
}
