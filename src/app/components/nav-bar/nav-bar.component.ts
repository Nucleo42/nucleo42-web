import { Component } from '@angular/core';
import { MenuBurgerComponent } from '@app/components/menu-burger/menu-burger.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIconModule, MenuBurgerComponent],
  providers: [MatIconRegistry],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/search.svg'));
    this.matIconRegistry.addSvgIcon('chevron', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/chevron.svg'));
  }
}
