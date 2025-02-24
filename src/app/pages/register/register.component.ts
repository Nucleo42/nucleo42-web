import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RegisterUser } from '@app/state/user/registerUser/register.actions';
import { NgxsFormDirective, UpdateFormDirty } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule, NgxsFormDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private store: Store) {}

  newCreatedUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required.bind(this)]),
    userName: new FormControl('', [Validators.required.bind(this)]),
    email: new FormControl('', [Validators.required.bind(this), Validators.email.bind(this)]),
    password: new FormControl('', [Validators.required.bind(this), Validators.minLength(8).bind(this)]),
    confirmPassword: new FormControl('', [Validators.required.bind(this)]),
  });

  hidePassword = true;
  hideConfirmPassword = true;

  get form() {
    return this.newCreatedUserForm.controls;
  }

  register() {
    if (this.newCreatedUserForm.invalid) {
      this.newCreatedUserForm.markAllAsTouched();
      return;
    }

    if (this.form['password'].value !== this.form['confirmPassword'].value) {
      this.form['confirmPassword'].setErrors({ mismatch: true });
      return;
    }

    this.store.dispatch(
      new RegisterUser(
        this.form['name'].value as string,
        this.form['userName'].value as string,
        this.form['email'].value as string,
        this.form['password'].value as string,
      ),
    );

    this.store.dispatch(
      new UpdateFormDirty({
        dirty: false,
        path: 'createdUser.newCreatedUserForm',
      }),
    );
  }

  togglePassword(field: string) {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.newCreatedUserForm.get(controlName);
    return !!(control && control.touched && control.hasError(error));
  }
}
