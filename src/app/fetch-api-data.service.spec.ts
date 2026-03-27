import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FetchApiDataService } from './fetch-api-data.service';
import { environment } from '../environments/environment';
import { STORAGE_KEYS } from './models/models';
import {
  mockMovie,
  mockMovies,
  mockUser,
  mockLoginResponse,
  mockGenre,
  mockDirector,
} from './testing/mock-data';

const apiUrl = environment.apiUrl;

describe('FetchApiDataService', () => {
  let service: FetchApiDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(FetchApiDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('userRegistration should POST to /users', () => {
    const mockRegistration = { Username: 'newuser', Password: 'pass123', Email: 'new@test.com' };
    const mockResponse = { message: 'User created' };

    service.userRegistration(mockRegistration).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl + 'users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRegistration);
    req.flush(mockResponse);
  });

  it('userLogin should POST to /login', () => {
    const credentials = { Username: 'testuser', Password: 'pass123' };

    service.userLogin(credentials).subscribe((res) => {
      expect(res).toEqual(mockLoginResponse);
    });

    const req = httpMock.expectOne(apiUrl + 'login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(mockLoginResponse);
  });

  it('getAllMovies should GET /movies', () => {
    service.getAllMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(apiUrl + 'movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('getSingleMovie should GET /movies/:title', () => {
    service.getSingleMovie('Inception').subscribe((movie) => {
      expect(movie).toEqual(mockMovie);
    });

    const req = httpMock.expectOne(apiUrl + 'movies/Inception');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovie);
  });

  it('getSingleDirector should GET /movies/director/:name', () => {
    service.getSingleDirector('Christopher Nolan').subscribe((director) => {
      expect(director).toEqual(mockDirector);
    });

    const req = httpMock.expectOne(apiUrl + 'movies/director/Christopher Nolan');
    expect(req.request.method).toBe('GET');
    req.flush(mockDirector);
  });

  it('getSingleGenre should GET /movies/genre/:name', () => {
    service.getSingleGenre('Action').subscribe((genre) => {
      expect(genre).toEqual(mockGenre);
    });

    const req = httpMock.expectOne(apiUrl + 'movies/genre/Action');
    expect(req.request.method).toBe('GET');
    req.flush(mockGenre);
  });

  it('getUser should GET /users/:username', () => {
    service.getUser('testuser').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(apiUrl + 'users/testuser');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('addFavoriteMovie should POST to /users/:user/movies/:id', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');

    service.addFavoriteMovie('2').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(apiUrl + 'users/testuser/movies/2');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('deleteFavoriteMovie should DELETE /users/:user/movies/:id', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');

    service.deleteFavoriteMovie('1').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(apiUrl + 'users/testuser/movies/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockUser);
  });

  it('editUser should PUT to /users/:username', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    const update = { Email: 'updated@test.com' };

    service.editUser(update).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(apiUrl + 'users/testuser');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(update);
    req.flush(mockUser);
  });

  it('deleteUser should DELETE /users/:username', () => {
    service.deleteUser('testuser').subscribe((res) => {
      expect(res).toBe('User deleted');
    });

    const req = httpMock.expectOne(apiUrl + 'users/testuser');
    expect(req.request.method).toBe('DELETE');
    req.flush('User deleted');
  });

  it('handleError should return message on server error', () => {
    service.getAllMovies().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error).toBe('Something bad happened; please try again later.');
      },
    });

    const req = httpMock.expectOne(apiUrl + 'movies');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

  it('handleError should return error message from server when provided', () => {
    service.getAllMovies().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error).toBe('Invalid credentials');
      },
    });

    const req = httpMock.expectOne(apiUrl + 'movies');
    req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
  });
});
