import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static emailOrUsername(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return { required: true };
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const usernamePattern = /^[a-zA-Z0-9._-]{3,}$/;
    if (emailPattern.test(value) || usernamePattern.test(value)) {
      return null;
    }
    return { emailOrUsername: true };
  }
}
