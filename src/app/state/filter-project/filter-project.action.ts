import { DifficultyLevel, IProject, IProjectFiltersState, StatusProjectEnum } from './filter-project.model';

export const loadProject = '[Projects] Load';
export class ClearFilter {
  static readonly type = '[Filters] Clear';
  constructor(public payload: IProjectFiltersState) {}
}

export class LoadProjectsSuccess {
  static readonly type = '[Projects] Load Success';
  constructor(public payload: IProject[]) {}
}

export class LoadProjectsError {
  static readonly type = '[Projects] Load Error';
  constructor(public payload: string) {}
}

export class ApplySearchFilter {
  static readonly type = '[Filters] Apply Search';
  constructor(public payload: string) {}
}

export class ApplyStackFilter {
  static readonly type = '[Filters] Apply Stack';
  constructor(public payload: string[]) {}
}

export class ApplyStatusFilter {
  static readonly type = '[Filters] Apply Status';
  constructor(public payload: StatusProjectEnum[]) {}
}

export class ApplyDifficultyFilter {
  static readonly type = '[Filters] Apply Difficulty';
  constructor(public payload: DifficultyLevel[]) {}
}

export class ApplyJobStatusFilter {
  static readonly type = '[Filters] Apply Job Status';
  constructor(public payload: boolean) {}
}
