import { IBaseStateModel } from '../models/base-state-model';

export interface AuthStateModel extends IBaseStateModel {
  token: string | null;
}
