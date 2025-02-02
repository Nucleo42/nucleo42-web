import { HttpErrorResponse } from '@angular/common/http';

export interface IBaseStateModel {
  error: HttpErrorResponse | null;
  loading: boolean;
}
