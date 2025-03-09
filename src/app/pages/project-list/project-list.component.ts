import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

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
