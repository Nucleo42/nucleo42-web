import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, LoginSuccess, LoginFailed } from './auth.action';
import { AuthService } from './auth.service';
import { catchError, of, tap } from 'rxjs';
import { AuthStateModel } from './auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: localStorage.getItem('authToken') ?? null,
    error: null,
    loading: false,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  @Selector()
  static getToken(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static getError({ error }: AuthStateModel): AuthStateModel['error'] {
    return error;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.email, action.password).pipe(
      tap((result) => {
        ctx.dispatch(new LoginSuccess(result.token));
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.dispatch(new LoginFailed(error.message));
        return of(error);
      }),
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, { token }: LoginSuccess) {
    ctx.patchState({ token });
    localStorage.setItem('authToken', token);
    return this.router.navigate(['/dashboard']);
  }

  @Action(LoginFailed)
  loginFailed(ctx: StateContext<AuthStateModel>, { error }: LoginFailed) {
    ctx.dispatch(error);
  }
}
