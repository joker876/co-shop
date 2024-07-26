import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ArdiumButtonModule,
  ArdiumCardModule,
  ArdiumPasswordInputModule,
  ArdiumSimpleInputModule,
  ArdiumSpinnerModule,
} from '@ardium-ui/ui';
import { AuthService } from '@services/auth';
import { AuthRegisterStep1Request } from '@shared/interfaces/auth/register';
import { customValidators, disableAllControls, restoreDisabledStates } from '@utils/form-utils';

@Component({
  selector: 'app-register-step1-form',
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
  templateUrl: './register-step1-form.component.html',
})
export class RegisterStep1FormComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isRegisterPending = signal<boolean>(false);
  readonly registerErrorResponse = signal<string | null>(null);

  readonly form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, customValidators.email]),
    password: new FormControl<string>('', [Validators.required]),
  });

  async onFormSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const disabledStates = disableAllControls(this.form);
    const isOk = await this.authService.executeRegisterStep1(this.form.value as AuthRegisterStep1Request);
    if (!isOk) {
      restoreDisabledStates(this.form, disabledStates);
      return;
    }
    this.router.navigate(['set-name'], { relativeTo: this.route });
  }
}
