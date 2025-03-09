import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-filter',
  imports: [MatIconModule],
  providers: [MatIconRegistry],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  title = 'Filtro';
  isVisible = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon('filter', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/filter.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/xMark.svg'));
  }

  toggleFilter(): void {
    const element = document.getElementById('filter-wrapper');
    if (!element) return;

    const currentDisplay = window.getComputedStyle(element).display;
    element.style.display = currentDisplay === 'none' ? 'flex' : 'none';
  }
}
