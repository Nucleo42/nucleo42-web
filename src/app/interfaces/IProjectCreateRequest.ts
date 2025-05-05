export interface IProjectCreateRequest {
  description: string;
  vacancies: number;
  goal: string;
  technology_ids: number[]; // ids das tecnologias associadas
}
