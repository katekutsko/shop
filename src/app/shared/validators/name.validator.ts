import { AbstractControl, ValidationErrors } from '@angular/forms';

export function firstNameValidatorFn({
  value,
}: AbstractControl): ValidationErrors | null {
  if (
    (typeof value === 'string' && value.match(/^[A-ZА-Я].*/) != null) ||
    value.length === 0
  ) {
    return null;
  }
  return {
    lowercaseFirstLetter: true,
  };
}
