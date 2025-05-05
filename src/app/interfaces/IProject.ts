import { IProjectMember } from './IProjectMember';
import { ITechnology } from './ITechnology';

export interface IProject {
  id: string;
  description: string;
  vacancies: number;
  goal: string;
  technologies: ITechnology[];
  members: IProjectMember[];
}
