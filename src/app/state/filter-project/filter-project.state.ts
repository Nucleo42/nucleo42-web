import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, createSelector } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { DifficultyLevel, IFilterProjectStateModel, IProject, IProjectFiltersState, StatusProjectEnum } from './filter-project.model';

import {
  ApplyDifficultyFilter,
  ApplyJobStatusFilter,
  ApplySearchFilter,
  ApplyStackFilter,
  ApplyStatusFilter,
  ClearFilter,
  LoadProjectsError,
  LoadProjectsSuccess,
} from './filter-project.action';

import { FilterProjectService } from './filter-project.service';

export class LoadProjects {
  static readonly type = '[Projects] Load';
  constructor(
    public payload: {
      filters?: Partial<IProjectFiltersState>;
      offset?: number;
    },
  ) {}
}

export const defaultState: IFilterProjectStateModel = {
  projects: [],
  filters: {
    searchText: '',
    selectedStacks: [],
    selectedStatus: [],
    selectedDifficulty: [],
    openJobsOnly: false,
  },
  filteredProjects: [],
  error: null,
  loading: false,
};

@State<IFilterProjectStateModel>({
  name: 'filterProject',
  defaults: defaultState,
})
@Injectable()
export class FilterProjectState {
  constructor(private filterProjectService: FilterProjectService) {}

  @Selector()
  static getProjects(state: IFilterProjectStateModel): IProject[] {
    return state.projects;
  }

  @Selector()
  static getFilteredProjects(state: IFilterProjectStateModel): IProject[] {
    return state.filteredProjects;
  }

  @Selector()
  static getSearchFilter(state: IFilterProjectStateModel): string {
    return state.filters.searchText;
  }

  @Selector()
  static getStackFilter(state: IFilterProjectStateModel): string[] {
    return state.filters.selectedStacks;
  }

  @Selector()
  static getStatusFilter(state: IFilterProjectStateModel): StatusProjectEnum[] {
    return state.filters.selectedStatus;
  }

  @Selector()
  static getDifficultyFilter(state: IFilterProjectStateModel): DifficultyLevel[] {
    return state.filters.selectedDifficulty;
  }

  @Selector()
  static getJobStatusFilter(state: IFilterProjectStateModel): boolean {
    return state.filters.openJobsOnly;
  }

  @Selector()
  static isLoading(state: IFilterProjectStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getError(state: IFilterProjectStateModel): HttpErrorResponse | null {
    return state.error;
  }

  @Selector()
  static getFilters(state: IFilterProjectStateModel): IProjectFiltersState {
    return state.filters;
  }

  static getProjectsWithFilters = createSelector(
    [
      (state: IFilterProjectStateModel) => state.projects,
      (state: IFilterProjectStateModel) => state.filters.searchText,
      (state: IFilterProjectStateModel) => state.filters.selectedStacks,
      (state: IFilterProjectStateModel) => state.filters.selectedStatus,
      (state: IFilterProjectStateModel) => state.filters.selectedDifficulty,
      (state: IFilterProjectStateModel) => state.filters.openJobsOnly,
    ],
    (
      projects: IProject[],
      searchText: string,
      selectedStacks: string[],
      selectedStatus: StatusProjectEnum[],
      selectedDifficulty: DifficultyLevel[],
      openJobsOnly: boolean,
    ): IProject[] => {
      let filteredProjects = [...projects];

      if (searchText) {
        const search = searchText.toLowerCase();
        filteredProjects = filteredProjects.filter(
          (project) => project.name.toLowerCase().includes(search) || project.description.toLowerCase().includes(search),
        );
      }

      if (selectedStacks.length > 0) {
        filteredProjects = filteredProjects.filter((project) => {
          return selectedStacks.some((stack) => project.stacks.has(stack));
        });
      }

      if (selectedStatus.length > 0) {
        filteredProjects = filteredProjects.filter((project) => selectedStatus.includes(project.status));
      }

      if (selectedDifficulty.length > 0) {
        filteredProjects = filteredProjects.filter((project) => selectedDifficulty.includes(project.difficulty));
      }

      if (openJobsOnly) {
        filteredProjects = filteredProjects.filter((project) => project.statusJobs);
      }

      return filteredProjects;
    },
  );

  @Action(ClearFilter)
  clearFilter(ctx: StateContext<IFilterProjectStateModel>): void {
    const defaultFilters = { ...defaultState.filters };
    ctx.patchState({
      filters: defaultFilters,
    });
    this.updateFilteredProjects(ctx);
  }

  @Action(ApplySearchFilter)
  applySearchFilter(ctx: StateContext<IFilterProjectStateModel>, action: ApplySearchFilter): void {
    const state = ctx.getState();
    const searchText = action.payload;
    ctx.patchState({
      filters: {
        ...state.filters,
        searchText,
      },
    });
    this.updateFilteredProjects(ctx);
  }

  @Action(ApplyStackFilter)
  applyStackFilter(ctx: StateContext<IFilterProjectStateModel>, action: ApplyStackFilter): void {
    const state = ctx.getState();
    const selectedStacks = action.payload;
    ctx.patchState({
      filters: {
        ...state.filters,
        selectedStacks,
      },
    });
    this.updateFilteredProjects(ctx);
  }

  @Action(ApplyStatusFilter)
  applyStatusFilter(ctx: StateContext<IFilterProjectStateModel>, action: ApplyStatusFilter): void {
    const state = ctx.getState();
    const selectedStatus = action.payload;
    ctx.patchState({
      filters: {
        ...state.filters,
        selectedStatus,
      },
    });
    this.updateFilteredProjects(ctx);
  }

  @Action(ApplyDifficultyFilter)
  applyDifficultyFilter(ctx: StateContext<IFilterProjectStateModel>, action: ApplyDifficultyFilter): void {
    const state = ctx.getState();
    const selectedDifficulty = action.payload;
    ctx.patchState({
      filters: {
        ...state.filters,
        selectedDifficulty,
      },
    });
    this.updateFilteredProjects(ctx);
  }

  @Action(ApplyJobStatusFilter)
  applyJobStatusFilter(ctx: StateContext<IFilterProjectStateModel>, action: ApplyJobStatusFilter): void {
    const state = ctx.getState();
    const openJobsOnly = action.payload;
    ctx.patchState({
      filters: {
        ...state.filters,
        openJobsOnly,
      },
    });
    this.updateFilteredProjects(ctx);
  }

  @Action(LoadProjects)
  loadProjects(ctx: StateContext<IFilterProjectStateModel>, action: LoadProjects): Observable<IProject[]> {
    const state = ctx.getState();

    const payload = action.payload;
    const filters = payload.filters ?? state.filters;
    const offset = typeof payload.offset === 'number' ? payload.offset : 0;

    ctx.patchState({ loading: true, error: null });

    return this.filterProjectService.getProjects(filters, offset, 6).pipe(
      tap((projects: IProject[]) => {
        ctx.dispatch(new LoadProjectsSuccess(projects));
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.message || 'Erro ao carregar projetos';
        ctx.dispatch(new LoadProjectsError(errorMessage));
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  @Action(LoadProjectsSuccess)
  loadProjectsSuccess(ctx: StateContext<IFilterProjectStateModel>, action: LoadProjectsSuccess): void {
    const projects = action.payload;
    ctx.patchState({
      projects,
      loading: false,
    });
    this.updateFilteredProjects(ctx);
  }

  @Action(LoadProjectsError)
  loadProjectsError(ctx: StateContext<IFilterProjectStateModel>, action: LoadProjectsError): void {
    const errorMessage = typeof action.payload === 'string' ? action.payload : 'Erro desconhecido';

    const errorResponse = new HttpErrorResponse({
      error: errorMessage,
      status: 0,
      statusText: 'Error',
      url: '',
    });

    ctx.patchState({
      error: errorResponse,
      loading: false,
    });
  }

  private updateFilteredProjects(ctx: StateContext<IFilterProjectStateModel>): void {
    const state = ctx.getState();
    const filteredProjects = FilterProjectState.getFilteredProjects(state);
    ctx.patchState({ filteredProjects });
  }
}
