import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RegisterUser } from '../../state/user/registerUser/register.actions';
import { NgxsFormDirective, UpdateFormDirty } from '@ngxs/form-plugin';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatIconModule, NgxsModule.forRoot([]), NgxsFormDirective],
      providers: [Store],
    }).compileComponents();

    store = TestBed.inject(Store);
    component = new RegisterComponent(store);
  });

  it('should return correct values from form getter', () => {
    component.newCreatedUserForm.setValue({
      name: 'Test User',
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(component.form['name'].value).toBe('Test User');
    expect(component.form['userName'].value).toBe('testuser');
    expect(component.form['email'].value).toBe('test@example.com');
    expect(component.form['password'].value).toBe('password123');
    expect(component.form['confirmPassword'].value).toBe('password123');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return form controls via getter', () => {
    expect(component.form).toBe(component.newCreatedUserForm.controls);
  });

  it('should initialize form with empty values', () => {
    const form = component.newCreatedUserForm;
    expect(form.valid).toBeFalsy();
    expect(form.get('name')?.value).toEqual('');
    expect(form.get('userName')?.value).toEqual('');
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('password')?.value).toEqual('');
    expect(form.get('confirmPassword')?.value).toEqual('');
  });

  it('should require fields in the form', () => {
    const requiredControls = ['name', 'userName', 'email', 'password', 'confirmPassword'];
    requiredControls.forEach((controlName) => {
      const control = component.newCreatedUserForm.get(controlName);
      control?.setValue('');
      expect(control?.valid).toBeFalsy();
      expect(control?.errors?.['required']).toBeTruthy();
    });
  });

  it('should validate email format and password length', () => {
    const emailControl = component.newCreatedUserForm.get('email');
    const passwordControl = component.newCreatedUserForm.get('password');

    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();

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

    component.newCreatedUserForm.get('confirmPassword')?.setValue('differentpassword');
    component.register();

    expect(component.newCreatedUserForm.get('confirmPassword')?.hasError('mismatch')).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.togglePassword('password');
    expect(component.hidePassword).toBeFalsy();

    component.togglePassword('password');
    expect(component.hidePassword).toBeTruthy();
  });

  it('should dispatch RegisterUser action and UpdateFormDirty action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.newCreatedUserForm.setValue({
      name: 'Test User',
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    component.register();

    expect(dispatchSpy).toHaveBeenCalledWith(
      new RegisterUser(
        component.form['name'].value as string,
        component.form['userName'].value as string,
        component.form['email'].value as string,
        component.form['password'].value as string,
      ),
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      new UpdateFormDirty({
        dirty: false,
        path: 'createdUser.newCreatedUserForm',
      }),
    );
  });

  it('should not dispatch actions when passwords do not match', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.newCreatedUserForm.setValue({
      name: 'Test User',
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'differentpassword',
    });

    component.register();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should call markAllAsTouched when form is invalid', () => {
    const markAllAsTouchedSpy = jest.spyOn(component.newCreatedUserForm, 'markAllAsTouched');
    component.register();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  describe('hasError', () => {
    it('should return true if control has error and is touched', () => {
      const control = component.newCreatedUserForm.get('name');
      control?.markAsTouched();
      control?.setErrors({ required: true });
      expect(component.hasError('name', 'required')).toBeTruthy();
    });

    it('should return false if control is not touched or does not have error', () => {
      const control = component.newCreatedUserForm.get('name');
      control?.setErrors({ required: true });
      expect(component.hasError('name', 'required')).toBeFalsy();
    });

    it('should return false if control does not exist', () => {
      expect(component.hasError('nonExistentControl', 'required')).toBeFalsy();
    });
  });
});
