import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstNameValidatorFn } from '../../../shared/validators';
import { CartFacadeService } from '../../../core';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {
  validationErrorMessages: Partial<{
    [key: string]: { [errorMessageKey: string]: string };
  }> = {
    firstName: {
      message: '',
      lowercaseFirstLetter: 'First letter must be uppercase',
      required: 'This field is required',
    },
    email: {
      messsage: '',
      required: 'This field is required',
      invalidFormat: 'Please enter a valid e-mail address',
    },
    address: {
      message: '',
      required: 'This field is required',
    },
  };

  orderForm: FormGroup;

  get firstName(): AbstractControl {
    return this.orderForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.orderForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.orderForm.get('email');
  }

  get phoneNumbers(): FormArray {
    return this.orderForm.get('phoneNumbers') as FormArray;
  }

  get pickup(): AbstractControl {
    return this.orderForm.get('pickup');
  }

  get address(): AbstractControl {
    return this.orderForm.get('address');
  }

  constructor(private cartFacade: CartFacadeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.orderForm = this.fb.group({
      firstName: ['', [Validators.required, firstNameValidatorFn]],
      lastName: [''],
      email: ['', [Validators.required]],
      phoneNumbers: this.fb.array([this.getPhoneNumber()]),
      pickup: [false],
      address: ['', [Validators.required]],
    });
  }

  getPhoneNumber(): FormControl {
    return this.fb.control(['']);
  }

  onAddPhoneNumber(): void {
    this.phoneNumbers.push(this.getPhoneNumber());
  }

  onRemovePhoneNumber(index: number): void {
    this.phoneNumbers.removeAt(index);
  }

  onPickupToggled(isPickup: boolean): void {
    if (isPickup) {
      this.address.setValidators([]);
    } else {
      this.address.setValidators([Validators.required]);
    }
    this.address.updateValueAndValidity();
  }

  private buildValidationMessages(controlName: string) {
    const control: AbstractControl = this[controlName];
    this.validationErrorMessages[controlName].message = '';

    if (
      (control.touched || control.dirty) &&
      control.invalid &&
      control.errors
    ) {
      this.validationErrorMessages[controlName].message = Object.keys(
        control.errors
      )
        .map((key) => this.validationErrorMessages[controlName][key])
        .join(' ');
    }
  }

  private setValidationMessages(controlName?: string) {
    if (controlName) {
      this.buildValidationMessages(controlName);
    } else {
      Object.keys(this.validationErrorMessages).forEach((controlName) => {
        this.buildValidationMessages(controlName);
      });
    }
  }

  onBlur(event) {
    const controlName = event.target.getAttribute('formControlName');
    this.setValidationMessages(controlName);
  }

  processOrder(): void {
    this.cartFacade.clear();
  }
}
