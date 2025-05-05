import { IProject } from './IProject';

export class ProjectStateModel {
  projects: IProject[] = [];
  selectedProject: IProject | null = null;
}
