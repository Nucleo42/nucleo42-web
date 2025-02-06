import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, MatIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.userForm.valid).toBeFalsy();
    expect(component.userForm.get('name')?.value).toEqual('');
    expect(component.userForm.get('userName')?.value).toEqual('');
    expect(component.userForm.get('email')?.value).toEqual('');
    expect(component.userForm.get('password')?.value).toEqual('');
    expect(component.userForm.get('confirmPassword')?.value).toEqual('');
  });

  it('should require fields in the form', () => {
    const nameControl = component.userForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
    expect(nameControl?.errors?.['required']).toBeTruthy();

    const userNameControl = component.userForm.get('userName');
    userNameControl?.setValue('');
    expect(userNameControl?.valid).toBeFalsy();
    expect(userNameControl?.errors?.['required']).toBeTruthy();

    const emailControl = component.userForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.userForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();
  });

  it('should validate password length', () => {
    const passwordControl = component.userForm.get('password');
    passwordControl?.setValue('short');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['minlength']).toBeTruthy();
  });

  it('should match passwords', () => {
    component.userForm.setValue({
      name: 'Test User',
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(component.userForm.valid).toBeTruthy();

    component.form['confirmPassword'].setValue('differentpassword');
    component.register();
    expect(component.form['confirmPassword'].hasError('mismatch')).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.togglePassword('password');
    expect(component.hidePassword).toBeFalsy();

    component.togglePassword('password');
    expect(component.hidePassword).toBeTruthy();
  });
});
