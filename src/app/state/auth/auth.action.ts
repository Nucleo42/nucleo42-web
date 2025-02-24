export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class LoginSuccess {
  static readonly type = '[Auth] Login Success';
  constructor(public token: string) {}
}

export class LoginFailed {
  static readonly type = '[Auth] Login Failed';
  constructor(public error: string) {}
}
