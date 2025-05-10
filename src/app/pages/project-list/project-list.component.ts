import { Component } from '@angular/core';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';

@Component({
  selector: 'app-project-list',
  imports: [FilterComponent, ProjectCardComponent],
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  title = 'Projetos';
}
