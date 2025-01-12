import { CommonModule } from '@angular/common';
import { Component, effect, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ArdiumButtonModule,
  ArdiumCardModule,
  ArdiumPasswordInputModule,
  ArdiumSimpleInputModule,
} from '@ardium-ui/ui';
import { AuthService } from '@services/auth';
import { UserService } from '@services/user/user.service';
import { AuthLoginRequest } from '@shared/interfaces/auth/login';
import { customValidators, disableAllControls, restoreDisabledStates } from '@utils/form-utils';

@Component({
  selector: 'app-login',
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
export class LoginPage {
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.userService.isAuthenticated()) {
        this.router.navigate(['/']);
      }
    });
  }

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
    const { isOk, hasNameSet } = await this.authService.executeLogin(this.form.value as AuthLoginRequest);
    if (!isOk) {
      restoreDisabledStates(this.form, disabledStates);
      return;
    }
    if (!hasNameSet) {
      this.router.navigate(['register', 'set-name']);
      return;
    }
    this.router.navigate(['']);
  }
}
