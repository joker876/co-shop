import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export type FormGroupErrors<T extends { [K in keyof T]: AbstractControl<any> }> = {
  [K in keyof T]: ValidationErrors | null;
};

export function getFormErrors<T extends { [K in keyof T]: AbstractControl<any> }>(
  form: FormGroup<T>
): { [K in keyof T]: ValidationErrors | null } {
  const errors = {} as Record<string, ValidationErrors | null>;

  const controlNames = Object.keys(form.controls);
  for (const controlName of controlNames) {
    errors[controlName] = form.get(controlName)?.errors ?? null;
  }

  return errors as FormGroupErrors<T>;
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
