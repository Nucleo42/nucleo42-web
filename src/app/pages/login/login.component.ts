import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required.bind(this), Validators.email.bind(this)]),
    password: new FormControl('', [Validators.required.bind(this), Validators.minLength(8).bind(this)]),
  });

  submitted = false;
  hidePassword = true;

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.submitted = true;
      return;
    }
    console.log(this.loginForm.value);
    this.submitted = false;
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
