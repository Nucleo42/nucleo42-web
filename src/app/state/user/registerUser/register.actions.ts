export class RegisterUser {
  static readonly type = '[Register] Register';
  constructor(
    public readonly name: string,
    public readonly userName: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class RegisterUserSuccess {
  static readonly type = '[Register] Register User Success';
  constructor(public message: string) {}
}

export class RegisterUserFailed {
  static readonly type = '[Register] Register User Failed';
  constructor(public error: string) {}
}
