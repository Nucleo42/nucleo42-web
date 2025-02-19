import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { Login } from '@app/state/auth/auth.action';
import { AuthState } from '@app/state/auth/auth.state';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required.bind(this), Validators.email.bind(this)]),
    password: new FormControl('', [Validators.required.bind(this), Validators.minLength(8).bind(this)]),
  });

  submitted = false;
  hidePassword = true;

  constructor(private store: Store) {}

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.submitted = true;
    }

    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      return;
    }

    this.store.dispatch(new Login(email, password));
    this.submitted = false;
    this.store
      .select(AuthState.getError.bind(this))
      .pipe(
        filter((error) => !!error),
        take(1),
      )
      .subscribe(() => {
        this.submitted = true;
      });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
