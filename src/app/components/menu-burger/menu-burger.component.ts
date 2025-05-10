import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-burger',
  imports: [MatIconModule],
  providers: [MatIconRegistry],
  templateUrl: './menu-burger.component.html',
  styleUrl: './menu-burger.component.scss',
})
export class MenuBurgerComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon('menu-burger', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/menu-burger.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('icons/xMark.svg'));
  }
  toggleMenuBurger(): void {
    const element = document.getElementById('menu-burger__wrapper');
    if (element) {
      element.style.display = element.style.display === 'none' ? 'flex' : 'none';
    }
  }
}
