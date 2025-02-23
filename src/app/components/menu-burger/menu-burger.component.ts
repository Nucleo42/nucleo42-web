import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-burger',
  imports: [],
  templateUrl: './menu-burger.component.html',
  styleUrl: './menu-burger.component.scss',
})
export class MenuBurgerComponent {
  toggleMenuBurger(): void {
    const element = document.getElementById('menu-burger__wrapper');
    if (element) {
      element.style.display = element.style.display === 'none' ? 'flex' : 'none';
    }
  }
}
