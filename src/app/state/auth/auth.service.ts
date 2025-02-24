import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  getApiUrlTest() {
    return this.apiUrl;
  }
}
