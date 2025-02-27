import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  hidePassword = true;
  loginError = '';
  error = false;

  login(): void {
    if (!this.email || !this.password) {
      this.loginError = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.email === 'user@example.com' && this.password === 'password') {
      alert('Login bem-sucedido!');
    } else {
      this.loginError = 'Email ou senha incorretos.';
      this.error = true;
    }
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
