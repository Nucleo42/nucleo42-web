import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxsModule, StateContext, Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';
import { AuthState } from './auth.state';
import { AuthService } from './auth.service';
import { Login, LoginSuccess, LoginFailed } from './auth.action';
import { AuthStateModel } from './auth.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthState', () => {
  let authService: AuthService;
  let router: Router;
  let state: AuthState;
  let store: Store;
  let ctx: StateContext<AuthStateModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState])],
      providers: [
        { provide: AuthService, useValue: { login: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    store = TestBed.inject(Store);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    state = TestBed.inject(AuthState);
    ctx = {
      getState: () => ({
        token: null,
        error: null,
        loading: false,
      }),
      setState: jest.fn(),
      patchState: jest.fn(),
      dispatch: jest.fn((action: unknown) => action),
    } as unknown as StateContext<AuthStateModel>;
  });

  it('should dispatch LoginSuccess on successful login', () => {
    (authService.login as jest.Mock).mockReturnValue(of({ token: 'fake-token' }));

    state.login(ctx, new Login('test@example.com', 'password')).subscribe(() => {
      const dispatchSpy = jest.spyOn(ctx, 'dispatch');
      expect(dispatchSpy).toHaveBeenCalledWith(new LoginSuccess('fake-token'));
    });
  });

  it('should dispatch LoginFailed on failed login', () => {
    (authService.login as jest.Mock).mockReturnValue(throwError(() => new Error('Login failed')));

    state.login(ctx, new Login('test@example.com', 'password')).subscribe(() => {
      const dispatchSpy = jest.spyOn(ctx, 'dispatch');
      expect(dispatchSpy).toHaveBeenCalledWith(new LoginFailed('Login failed'));
    });
  });

  it('should set token and navigate on LoginSuccess', () => {
    void state.loginSuccess(ctx, new LoginSuccess('fake-token'));

    const patchStateSpy = jest.spyOn(ctx, 'patchState');
    const navigateSpy = jest.spyOn(router, 'navigate');

    expect(patchStateSpy).toHaveBeenCalledWith({ token: 'fake-token' });
    expect(localStorage.getItem('authToken')).toBe('fake-token');
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should dispatch error on LoginFailed', () => {
    state.loginFailed(ctx, new LoginFailed('error'));

    const dispatchSpy = jest.spyOn(ctx, 'dispatch');

    expect(dispatchSpy).toHaveBeenCalledWith('error');
  });
  describe('AuthState Selectors', () => {
    it('should return error from getError selector', () => {
      const mockError = new HttpErrorResponse({
        error: 'Login failed',
        status: 401,
        statusText: 'Unauthorized',
      });

      store.reset({
        auth: {
          token: null,
          error: mockError,
          loading: false,
        } as AuthStateModel,
      });

      const error = store.selectSnapshot(AuthState.getError.bind(AuthState));

      expect(error).toEqual(mockError);
    });
  });
});
