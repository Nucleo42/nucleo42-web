import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { RegisterUser, RegisterUserFailed, RegisterUserSuccess } from './register.actions';
import { RegisterUserStateModel } from './register.models';
import { UserService } from '../user.service';
import { catchError, tap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@State({
  name: 'createdUser',
  defaults: {
    newCreatedUserForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class RegisterUserState {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  @Action(RegisterUser)
  RegisterUser(ctx: StateContext<RegisterUserStateModel>, form: RegisterUser) {
    return this.userService.createdUser(form).pipe(
      tap((result) => {
        ctx.dispatch(new RegisterUserSuccess(result.message));
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.dispatch(new RegisterUserFailed(error.message));
        return of(error);
      }),
    );
  }

  @Action(RegisterUserSuccess)
  registerUserSuccess(ctx: StateContext<RegisterUserStateModel>, { message }: RegisterUserSuccess) {
    ctx.dispatch(message);
    return this.router.navigate(['/login']);
  }

  @Action(RegisterUserFailed)
  registerUserFailed(ctx: StateContext<RegisterUserStateModel>, { error }: RegisterUserFailed) {
    ctx.dispatch(error);
  }
}
