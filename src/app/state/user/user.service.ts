import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from './registerUser/register.actions';

export interface RegisterResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  createdUser({ name, userName, email, password }: RegisterUser) {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/created`, { name, userName, email, password });
  }
  getApiUrlTest() {
    return this.apiUrl;
  }
}
