import { ISkill } from './ISkill';

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  accept_terms: boolean;
  email_verification: boolean;
  biography?: string;
  skills: ISkill[];
}
