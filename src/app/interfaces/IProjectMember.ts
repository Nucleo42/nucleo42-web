import { IRole } from './IRole';

export interface IProjectMember {
  project_id: string;
  member_id: string;
  role: IRole;
}
