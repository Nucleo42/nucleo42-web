import { HttpErrorResponse } from '@angular/common/http';
import { IBaseStateModel } from '../models/base-state-model';

export type DifficultyLevel = 'INICIANTE' | 'JUNIOR' | 'PLENO' | 'SENIOR';

export enum StatusProjectEnum {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  DONE = 'DONE',
}

export interface IFilterProjectStateModel extends IBaseStateModel {
  projects: IProject[];
  filters: IProjectFiltersState;
  filteredProjects: IProject[];
  error: HttpErrorResponse | null;
  loading: boolean;
}

export interface IProject {
  name: string;
  description: string;
  stacks: Map<string, string>;
  status: StatusProjectEnum;
  difficulty: DifficultyLevel;
  statusJobs: boolean;
}

export interface IProjectFiltersState {
  searchText: string;
  selectedStacks: string[];
  selectedStatus: StatusProjectEnum[];
  selectedDifficulty: DifficultyLevel[];
  openJobsOnly: boolean;
}
