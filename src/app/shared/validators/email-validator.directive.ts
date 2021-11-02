import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate({ value }: AbstractControl): ValidationErrors | null {
    if (
      (typeof value === 'string' &&
        value.match(/[a-z0-9]{5,10}@[a-z]{3,6}\.[a-z]{2,3}/)) ||
      value.length === 0
    ) {
      return null;
    }
    return {
      invalidFormat: true,
    };
  }
}
