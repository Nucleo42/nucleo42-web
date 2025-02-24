import { IBaseStateModel } from '@app/state/models/base-state-model';

export interface RegisterUserStateModel extends IBaseStateModel {
  newCreatedUserForm: {
    model?: {
      name: string;
      userName: string;
      email: string;
      password: string;
    };
  };
}
