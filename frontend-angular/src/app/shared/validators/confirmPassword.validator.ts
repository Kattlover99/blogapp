import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function confirmPassword(): ValidatorFn {
    return (fieldForm: AbstractControl): ValidationErrors | null => {
        const form = fieldForm.parent;
        const password = form?.get('password')?.value;
        const confirmPassword = form?.get('confirmPassword')?.value;

        return password == confirmPassword ? null : { confirmPassword: true }
    }
}
