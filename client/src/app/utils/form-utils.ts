import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

type FormGroupType<T> = { [K in keyof T]: AbstractControl<any> };

export type FormGroupErrors<T extends FormGroupType<T>> = {
  [K in keyof T]: ValidationErrors | null;
};

export function getFormErrors<T extends FormGroupType<T>>(
  form: FormGroup<T>
): { [K in keyof T]: ValidationErrors | null } {
  const errors = {} as Record<string, ValidationErrors | null>;

  const controlNames = Object.keys(form.controls);
  for (const controlName of controlNames) {
    errors[controlName] = form.get(controlName)?.errors ?? null;
  }

  return errors as FormGroupErrors<T>;
}
export type FormGroupDisabledStates<T extends FormGroupType<T>> = {
  [K in keyof T]: boolean;
};

export function disableAllControls<T extends FormGroupType<T>>(form: FormGroup<T>): FormGroupDisabledStates<T> {
  const states: Partial<FormGroupDisabledStates<T>> = {};

  for (const fieldName in form.controls) {
    const control = form.controls[fieldName];
    states[fieldName] = control.disabled;
    control.disable();
  }

  return states as FormGroupDisabledStates<T>;
}
export function restoreDisabledStates<T extends FormGroupType<T>>(
  form: FormGroup<T>,
  states: FormGroupDisabledStates<T>
): void {
  for (const key in form.controls) {
    const control = form.controls[key];

    if (states[key]) {
      control.disable();
    } else {
      control.enable();
    }
  }
}

export const customValidators: {
  readonly email: ValidatorFn;
} = {
  email: (control: AbstractControl): ValidationErrors => {
    if (
      !/^[A-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\.[A-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[A-Z0-9-]+(?:\.[A-Z0-9-]{2,})*$/i.test(
        control.value
      )
    ) {
      return { email: true };
    }
    return {};
  },
};
