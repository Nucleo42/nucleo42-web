import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DifficultyLevel, IProject, IProjectFiltersState, StatusProjectEnum } from './filter-project.model';

@Injectable({
  providedIn: 'root',
})
export class FilterProjectService {
  readonly apiUrl = 'api/projects';

  constructor(private http: HttpClient) {}

  processStackSelection(checkboxes: NodeListOf<Element>): string[] {
    return Array.from(checkboxes)
      .map((checkbox) => (checkbox as HTMLInputElement).getAttribute('data-value') ?? '')
      .filter((value): value is string => value !== '');
  }

  processDifficultySelection(checkboxes: NodeListOf<Element>): DifficultyLevel[] {
    const difficultyMapping: Record<string, DifficultyLevel> = {
      difficulty1: 'INICIANTE',
      difficulty2: 'JUNIOR',
      difficulty3: 'PLENO',
      difficulty4: 'SENIOR',
    };

    const selectedDifficulties = Array.from(checkboxes)
      .map((checkbox) => {
        const dataValue = (checkbox as HTMLInputElement).getAttribute('data-value') ?? '';
        return difficultyMapping[dataValue];
      })
      .filter((value): value is DifficultyLevel => this.isDifficultyLevel(value));

    return selectedDifficulties;
  }

  isDifficultyLevel(value: unknown): value is DifficultyLevel {
    return value === 'INICIANTE' || value === 'JUNIOR' || value === 'PLENO' || value === 'SENIOR';
  }

  processStatusSelection(value: string): StatusProjectEnum {
    const statusMapping: Record<string, StatusProjectEnum> = {
      ACTIVE: StatusProjectEnum.ACTIVE,
      PAUSED: StatusProjectEnum.PAUSED,
      DONE: StatusProjectEnum.DONE,
    };

    return statusMapping[value];
  }

  processJobStatusSelection(value: string): boolean {
    return value === 'true';
  }

  getProjects(filters: Partial<IProjectFiltersState>, offset = 0, limit = 6): Observable<IProject[]> {
    let params = new HttpParams().set('offset', offset.toString()).set('limit', limit.toString());

    if (filters.searchText) {
      params = params.set('search', filters.searchText);
    }

    const stacks = filters.selectedStacks ?? [];
    stacks.forEach((stack) => {
      params = params.append('stacks', stack);
    });

    const statuses = filters.selectedStatus ?? [];
    statuses.forEach((status) => {
      params = params.append('status', status);
    });

    const difficulties = filters.selectedDifficulty ?? [];
    difficulties.forEach((difficulty) => {
      params = params.append('difficulty', difficulty);
    });

    if (filters.openJobsOnly === true) {
      params = params.set('openJobs', 'true');
    }

    return this.http.get<IProject[]>(this.apiUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching projects:', error);
        return throwError(() => error);
      }),
    );
  }
}
