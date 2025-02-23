import { Component } from '@angular/core';
import { MenuBurgerComponent } from '@app/components/menu-burger/menu-burger.component';

@Component({
  selector: 'app-nav-bar',
  imports: [MenuBurgerComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  title = '';
}
