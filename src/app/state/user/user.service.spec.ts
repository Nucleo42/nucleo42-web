import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { RegisterResponse, UserService } from './user.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: { post: jest.Mock };

  beforeEach(() => {
    httpClientSpy = { post: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        UserService,
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should Register user', () => {
    const dummyResponse: RegisterResponse = { message: 'Register Success' };

    const register = {
      name: 'TesteName',
      userName: 'TestUser',
      email: 'test@example.com',
      password: 'password',
    };

    httpClientSpy.post.mockReturnValue(of(dummyResponse));

    service.createdUser(register).subscribe((res) => {
      expect(res.message).toEqual(dummyResponse.message);
    });

    const { name, userName, email, password } = register;

    expect(httpClientSpy.post).toHaveBeenCalledWith(`${service.getApiUrlTest()}/created`, { name, userName, email, password });
  });
});
