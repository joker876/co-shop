import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

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
