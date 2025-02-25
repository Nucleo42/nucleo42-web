import { Component } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { FilterComponent } from '../../filter/filter.component';
import { ProjectCardComponent } from '../../project-card/project-card.component';

@Component({
  selector: 'project-list',
  imports: [NavBarComponent, FilterComponent, ProjectCardComponent],
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  title = 'Projetos';
}
