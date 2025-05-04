import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProject } from '@app/state/filter-project/filter-project.model';

@Component({
  selector: 'app-project-card',
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project!: IProject;
}
