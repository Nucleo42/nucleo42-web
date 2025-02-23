import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  title = 'Filtro';
  isVisible = false;

  toggleFilter(): void {
    const element = document.getElementById('filter-wrapper');
    if (!element) return;

    const currentDisplay = window.getComputedStyle(element).display;
    element.style.display = currentDisplay === 'none' ? 'flex' : 'none';
  }
}
