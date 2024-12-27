import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArdiumButtonModule, ArdiumCardModule, ArdiumSimpleInputModule, ArdiumSpinnerModule } from '@ardium-ui/ui';
import { AuthService } from '@services/auth';
import { AuthRegisterStep2Request } from '@shared/interfaces/auth/register';
import { disableAllControls, restoreDisabledStates } from '@utils/form-utils';

@Component({
    selector: 'app-register-step2-form',
    imports: [
        ArdiumCardModule,
        ArdiumSimpleInputModule,
        ArdiumButtonModule,
        ArdiumSpinnerModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './register-step2-form.component.html',
    styleUrls: ['./register-step2-form.component.scss']
})
export class RegisterStep2FormComponent {
  readonly authService = inject(AuthService);

  readonly form = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.maxLength(48)]),
  });

  async onFormSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const disabledStates = disableAllControls(this.form);
    const isOk = await this.authService.executeRegisterStep2(this.form.value as AuthRegisterStep2Request);
    if (!isOk) {
      restoreDisabledStates(this.form, disabledStates);
      return;
    }
    alert('name accepted!');
  }
  onMoreInfoClick() {
    //TODO make a better modal here
    alert(
      "We will only show your name to the people you share folders or lists with. No one else.\n\nIt doesn't have to be your real name. It can really be whatever you would like to be called."
    );
  }
}
