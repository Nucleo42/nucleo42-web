import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, MatIconModule, CommonModule],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Garante que o ciclo de vida do Angular seja iniciado
  });

  test('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  test('deve exibir mensagem de erro se campos estiverem vazios', () => {
    component.email = '';
    component.password = '';
    component.login();
    fixture.detectChanges();
    expect(component.loginError).toBe('Por favor, preencha todos os campos.');
  });

  test('deve fazer login com credenciais corretas', () => {
    component.email = 'user@example.com';
    component.password = 'password';
    jest.spyOn(window, 'alert').mockImplementation(() => {
      const myArray = [
        { login: 'test', senha: '123456' },
        { login: 'test2', senha: '123456789' },
      ];
      // Estrutura mais complexa para testes
      console.log(myArray);
    });

    component.login();
    fixture.detectChanges();
    expect(component.loginError).toBe('');
    expect(window.alert).toHaveBeenCalledWith('Login bem-sucedido!');
  });

  test('deve exibir mensagem de erro com credenciais incorretas', () => {
    component.email = 'email@errado.com';
    component.password = 'senhaerrada';
    component.login();
    fixture.detectChanges();
    expect(component.loginError).toBe('Email ou senha incorretos.');
  });

  test('deve alternar a visibilidade da senha', () => {
    expect(component.hidePassword).toBe(true);
    component.togglePassword();
    expect(component.hidePassword).toBe(false);
  });
});
