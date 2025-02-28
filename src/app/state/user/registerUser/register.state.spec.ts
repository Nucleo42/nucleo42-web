import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxsModule, StateContext } from '@ngxs/store';
import { UserService } from '../user.service';
import { RegisterUserState } from './register.states';
import { RegisterUserStateModel } from './register.models';
import { of, throwError } from 'rxjs';
import { RegisterUser, RegisterUserSuccess, RegisterUserFailed } from './register.actions';

describe('UserCreatedState', () => {
  let userService: UserService;
  let router: Router;
  let state: RegisterUserState;
  let ctx: StateContext<RegisterUserStateModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([RegisterUserState])],
      providers: [
        { provide: UserService, useValue: { createdUser: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    state = TestBed.inject(RegisterUserState);
    ctx = {
      getState: () => ({
        token: null,
        error: null,
        loading: false,
      }),
      setState: jest.fn(),
      patchState: jest.fn(),
      dispatch: jest.fn((action: unknown) => action),
    } as unknown as StateContext<RegisterUserStateModel>;
  });
  it('should dispatch RegisterSuccess on successful register', () => {
    (userService.createdUser as jest.Mock).mockReturnValue(of({ message: 'Usuario criado com success' }));
    state.RegisterUser(ctx, new RegisterUser('Raphael', 'oliveiraster', 'email@exempla.com', 'teste1234')).subscribe(() => {
      const dispatchSpy = jest.spyOn(ctx, 'dispatch');
      console.log(dispatchSpy);
      expect(dispatchSpy).toHaveBeenCalledWith(new RegisterUserSuccess('Usuario criado com success'));
    });
  });

  it('should dispatch RegisterFailed on failed registerUser', () => {
    (userService.createdUser as jest.Mock).mockReturnValue(throwError(() => new Error('Created failed')));

    state.RegisterUser(ctx, new RegisterUser('Raphael', 'oliveiraster', 'email@exempla.com', 'teste1234')).subscribe(() => {
      const dispatchSpy = jest.spyOn(ctx, 'dispatch');
      expect(dispatchSpy).toHaveBeenCalledWith(new RegisterUserFailed('Created failed'));
    });
  });

  it('should navigate on RegisterUserSuccess', () => {
    void state.registerUserSuccess(ctx, new RegisterUserSuccess('Created User'));

    const navigateSpy = jest.spyOn(router, 'navigate');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should dispatch error on RegisterUserFailed', () => {
    state.registerUserFailed(ctx, new RegisterUserFailed('error'));

    const dispatchSpy = jest.spyOn(ctx, 'dispatch');
    expect(dispatchSpy).toHaveBeenCalledWith('error');
  });
});
