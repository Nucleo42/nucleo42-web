import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Login } from '../../state/auth/auth.action';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storeMock: { dispatch: jest.Mock; select: jest.Mock };

  beforeEach(async () => {
    storeMock = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatIconModule, CommonModule, LoginComponent],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should mark form as touched when login is called with invalid form', () => {
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('');

    component.login();

    expect(component.loginForm.touched).toBeTruthy();
    expect(component.submitted).toBeTruthy();
  });

  it('should dispatch login action when form is valid', () => {
    component.loginForm.controls.email.setValue('test@example.com');
    component.loginForm.controls.password.setValue('password123');
    component.login();

    expect(storeMock.dispatch).toHaveBeenCalledWith(new Login('test@example.com', 'password123'));
    expect(component.submitted).toBeFalsy();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBeTruthy();
    component.togglePassword();
    expect(component.hidePassword).toBeFalsy();
  });

  it('should set submitted to true if an error occurs in login', () => {
    storeMock.select.mockReturnValue(of('Login failed'));
    component.loginForm.controls.email.setValue('test@example.com');
    component.loginForm.controls.password.setValue('password123');
    component.login();
    expect(component.submitted).toBeTruthy();
  });
});
