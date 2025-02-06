import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required.bind(this)]),
    userName: new FormControl('', [Validators.required.bind(this)]),
    email: new FormControl('', [Validators.required.bind(this), Validators.email.bind(this)]),
    password: new FormControl('', [Validators.required.bind(this), Validators.minLength(8).bind(this)]),
    confirmPassword: new FormControl('', [Validators.required.bind(this)]),
  });

  hidePassword = true;
  hideConfirmPassword = true;

  get form() {
    return this.userForm.controls;
  }

  register() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.form['password'].value !== this.form['confirmPassword'].value) {
      this.form['confirmPassword'].setErrors({ mismatch: true });
      return;
    }

    console.log('Formulário válido, enviando dados...', this.userForm.value);
  }

  togglePassword(field: string) {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.userForm.get(controlName);
    return !!(control && control.touched && control.hasError(error));
  }
}
