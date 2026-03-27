import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { STORAGE_KEYS } from './models/models';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should add Authorization header when token exists', () => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, 'my-token');

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-token');
    req.flush({});
  });

  it('should not add Authorization header when no token', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should pass through request unmodified when no token', () => {
    httpClient.get('/api/movies').subscribe();

    const req = httpMock.expectOne('/api/movies');
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('/api/movies');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});
