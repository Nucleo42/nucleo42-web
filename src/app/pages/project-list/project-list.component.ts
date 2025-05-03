import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { FilterProjectState, LoadProjects } from '@app/state/filter-project/filter-project.state';
import { IFilterProjectStateModel, IProject } from '@app/state/filter-project/filter-project.model';

@Component({
  selector: 'app-project-list',
  imports: [FilterComponent, ProjectCardComponent],
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  title = 'Projetos';

  projects$: Observable<IProject[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error | null>;

  private destroy$ = new Subject<void>();

  currentOffset = 0;
  pageSize = 6;
  hasMoreProjects = true;

  constructor(private store: Store) {
    this.projects$ = this.store.select((state: IFilterProjectStateModel) => FilterProjectState.getFilteredProjects(state));
    this.loading$ = this.store.select((state: IFilterProjectStateModel) => FilterProjectState.isLoading(state));
    this.error$ = this.store.select((state: IFilterProjectStateModel) => FilterProjectState.getError(state));
  }

  ngOnInit(): void {
    this.loadInitialProjects();

    this.projects$.pipe(takeUntil(this.destroy$)).subscribe((projects) => {
      this.checkHasMoreProjects(projects);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadInitialProjects(): void {
    this.currentOffset = 0;
    this.hasMoreProjects = true;
    this.store.dispatch(new LoadProjects({ offset: this.currentOffset }));
  }

  loadMoreProjects(): void {
    if (!this.hasMoreProjects) return;

    this.currentOffset += this.pageSize;
    this.store.dispatch(new LoadProjects({ offset: this.currentOffset }));
  }

  checkHasMoreProjects(projects: IProject[]): void {
    this.hasMoreProjects = projects.length === this.pageSize;
  }

  trackById(_index: number, project: IProject): string {
    return project.name;
  }

  retryLoadProjects(): void {
    this.store.dispatch(new LoadProjects({ offset: this.currentOffset }));
  }
}
