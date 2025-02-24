import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { AuthService, AuthResponse } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: { post: jest.Mock };

  beforeEach(() => {
    httpClientSpy = { post: jest.fn() };

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), AuthService, { provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should login and return a token', (done) => {
    const dummyResponse: AuthResponse = { token: '123456' };
    const email = 'test@example.com';
    const password = 'password';

    httpClientSpy.post.mockReturnValue(of(dummyResponse));

    service.login(email, password).subscribe((res) => {
      expect(res.token).toEqual(dummyResponse.token);
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(`${service.getApiUrlTest()}/login`, { email, password });
  });
});
