import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register.component';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { RegisterUser } from '../../state/user/registerUser/register.actions';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, MatIconModule, NgxsModule.forRoot([])],
      providers: [Store],
    }).compileComponents();

    store = TestBed.inject(Store);
    component = new RegisterComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.newCreatedUserForm.valid).toBeFalsy();
    expect(component.newCreatedUserForm.get('name')?.value).toEqual('');
    expect(component.newCreatedUserForm.get('userName')?.value).toEqual('');
    expect(component.newCreatedUserForm.get('email')?.value).toEqual('');
    expect(component.newCreatedUserForm.get('password')?.value).toEqual('');
    expect(component.newCreatedUserForm.get('confirmPassword')?.value).toEqual('');
  });

  it('should require fields in the form', () => {
    const nameControl = component.newCreatedUserForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalsy();
    expect(nameControl?.errors?.['required']).toBeTruthy();

    const userNameControl = component.newCreatedUserForm.get('userName');
    userNameControl?.setValue('');
    expect(userNameControl?.valid).toBeFalsy();
    expect(userNameControl?.errors?.['required']).toBeTruthy();

    const emailControl = component.newCreatedUserForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.newCreatedUserForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();
  });

  it('should validate password length', () => {
    const passwordControl = component.newCreatedUserForm.get('password');
    passwordControl?.setValue('short');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['minlength']).toBeTruthy();
  });

  it('should match passwords', () => {
    component.newCreatedUserForm.setValue({
      name: 'Test User',
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(component.newCreatedUserForm.valid).toBeTruthy();

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

  it('should dispatch RegisterUser action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue(of(void 0));

    component.newCreatedUserForm.setValue({
      name: 'Test User',
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    component.register();

    expect(dispatchSpy).toHaveBeenCalledWith(new RegisterUser('Test User', 'testuser', 'test@example.com', 'password123'));
  });
});
