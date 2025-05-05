export interface IProjectResponse {
  id: string;
  description: string;
  vacancies: number;
  goal: string;
  technologies: {
    id: number;
    name: string;
  }[];
  members: {
    id: number;
    name: string;
    role: string;
  }[];
}
