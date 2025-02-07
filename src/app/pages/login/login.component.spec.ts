import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatIconModule, LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com o formulário inválido', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('deve validar e-mail obrigatório', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('');
    expect(email.valid).toBeFalsy();
    expect(email.hasError('required')).toBeTruthy();
  });

  it('deve validar formato inválido de e-mail', () => {
    const email = component.loginForm.controls['email'];
    email.setValue('email-invalido');
    expect(email.valid).toBeFalsy();
    expect(email.hasError('email')).toBeTruthy();
  });

  it('deve validar senha mínima de 8 caracteres', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('1234567'); // Apenas 7 caracteres
    expect(password.valid).toBeFalsy();
    expect(password.hasError('minlength')).toBeTruthy();
  });

  it('deve permitir senha válida', () => {
    const password = component.loginForm.controls['password'];
    password.setValue('12345678'); // 8 caracteres válidos
    expect(password.valid).toBeTruthy();
  });

  it('deve marcar os campos como tocados ao tentar login inválido', () => {
    component.login();
    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.controls['email'].touched).toBeTruthy();
    expect(component.loginForm.controls['password'].touched).toBeTruthy();
  });

  it('deve permitir login com dados válidos', () => {
    component.loginForm.controls['email'].setValue('teste@email.com');
    component.loginForm.controls['password'].setValue('12345678');

    component.login();
    expect(component.loginForm.valid).toBeTruthy();
    expect(component.submitted).toBeFalsy();
  });

  it('deve alternar a visibilidade da senha', () => {
    expect(component.hidePassword).toBeTruthy(); // Inicialmente true
    component.togglePassword();
    expect(component.hidePassword).toBeFalsy(); // Deve ficar false
    component.togglePassword();
    expect(component.hidePassword).toBeTruthy(); // Deve voltar a true
  });
});
