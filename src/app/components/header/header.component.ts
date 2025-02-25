import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() buttonName = '';

  constructor(private readonly store: Store) {}

  onClick() {
    this.store.dispatch(new Navigate(['/layout']));
    console.log('click');
  }
}
