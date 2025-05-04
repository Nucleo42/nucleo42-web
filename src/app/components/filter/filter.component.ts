import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterProjectService } from '@app/state/filter-project/filter-project.service';
import {
  ApplyStackFilter,
  ApplyDifficultyFilter,
  ApplyStatusFilter,
  ApplyJobStatusFilter,
} from '@app/state/filter-project/filter-project.action';
import { StatusProjectEnum } from '@app/state/filter-project/filter-project.model';

@Component({
  selector: 'app-filter',
  imports: [MatIconModule],
  providers: [MatIconRegistry],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit, AfterViewInit {
  title = 'Filtro';
  isVisible = false;

  constructor(
    private store: Store,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private filterProjectService: FilterProjectService,
  ) {
    this.matIconRegistry.addSvgIcon('filter', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/filter.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/xMark.svg'));
  }

  ngOnInit(): void {
    const element = document.getElementById('filter-wrapper');
    if (element) {
      element.style.display = 'none';
    }
  }

  ngAfterViewInit(): void {
    this.setupFilterListeners();
  }

  toggleFilter(): void {
    const element = document.getElementById('filter-wrapper');
    if (!element) return;

    const currentDisplay = window.getComputedStyle(element).display;
    element.style.display = currentDisplay === 'none' ? 'flex' : 'none';

    if (currentDisplay === 'none') {
      this.processAllFilters();
    }
  }

  resetFilters(): void {
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    checkboxes.forEach((element: Element) => {
      const checkbox = element as HTMLInputElement;
      checkbox.checked = false;
    });
    this.filterProjectService.clearFilters();
  }

  setupFilterListeners(): void {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-category][data-value]');

    checkboxes.forEach((element: Element) => {
      const checkbox = element as HTMLInputElement;
      checkbox.addEventListener('change', () => {
        this.processAllFilters();
      });
    });
  }

  processAllFilters(): void {
    this.processStackFilters();
    this.processDifficultyFilters();
    this.processStatusFilters();
    this.processJobStatusFilters();
  }

  private processStackFilters(): void {
    const stackCheckboxes = document.querySelectorAll('input[type="checkbox"][data-category="linguagens"]:checked');
    const selectedStacks = this.filterProjectService.processStackSelection(stackCheckboxes);
    this.store.dispatch(new ApplyStackFilter(selectedStacks));
  }

  private processDifficultyFilters(): void {
    const difficultyCheckboxes = document.querySelectorAll('input[type="checkbox"][data-category="Difficulty"]:checked');
    const selectedDifficulties = this.filterProjectService.processDifficultySelection(difficultyCheckboxes);
    this.store.dispatch(new ApplyDifficultyFilter(selectedDifficulties));
  }

  private processStatusFilters(): void {
    const statusCheckboxes = document.querySelectorAll('input[type="checkbox"][data-category="Status"]:checked');
    const selectedStatus: StatusProjectEnum[] = [];

    statusCheckboxes.forEach((element: Element) => {
      const checkbox = element as HTMLInputElement;
      const dataValue = checkbox.getAttribute('data-value');
      if (dataValue) {
        switch (dataValue) {
          case 'difficulty1':
            selectedStatus.push(StatusProjectEnum.ACTIVE);
            break;
          case 'difficulty2':
            selectedStatus.push(StatusProjectEnum.PAUSED);
            break;
          case 'difficulty3':
            selectedStatus.push(StatusProjectEnum.DONE);
            break;
        }
      }
    });

    this.store.dispatch(new ApplyStatusFilter(selectedStatus));
  }

  private processJobStatusFilters(): void {
    const jobStatusCheckbox = document.querySelector('input[type="checkbox"][data-category="OpenJob"][data-value="difficulty1"]:checked');
    const openJobsOnly = !!jobStatusCheckbox;

    this.store.dispatch(new ApplyJobStatusFilter(openJobsOnly));
  }

  processFilterChange(element: Element): void {
    const checkbox = element as HTMLInputElement;
    const category = checkbox.getAttribute('data-category');
    const value = checkbox.getAttribute('data-value');

    if (!category || !value) return;

    switch (category) {
      case 'linguagens':
        this.processStackFilters();
        break;
      case 'Difficulty':
        this.processDifficultyFilters();
        break;
      case 'Status':
        this.processStatusFilters();
        break;
      case 'OpenJob':
        this.processJobStatusFilters();
        break;
    }
  }
}
