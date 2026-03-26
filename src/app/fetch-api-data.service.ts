import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  Movie,
  User,
  Genre,
  Director,
  LoginResponse,
  RegistrationResponse,
  UserCredentials,
  UserRegistration,
  UserUpdate,
  STORAGE_KEYS,
} from './models/models';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
/**
 * Main service for communicating with the Flicktionary backend API.
 *
 * Provides methods for user registration, authentication, movie retrieval, and user profile management.
 * Auth tokens are attached automatically by the authInterceptor.
 */
export class FetchApiDataService {
  /**
   * Creates an instance of FetchApiDataService.
   *
   * @param http - Angular HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Handles HTTP errors from API requests.
   *
   * @param error - The HTTP error response.
   * @returns An observable error to be handled by the subscriber.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent
        ? error.error.message
        : error.error?.message || 'Something bad happened; please try again later.';
    return throwError(() => message);
  }

  /**
   * Extracts the response data from an HTTP response.
   *
   * @param res - The HTTP response object.
   * @returns The response body.
   */
  private extractResponseData<T>(res: T): T {
    return res;
  }

  /**
   * Registers a new user with the provided details.
   *
   * @param userDetails - The user registration details (username, password, email, birthday, etc.).
   * @returns An Observable containing the created user object.
   */
  public userRegistration(userDetails: UserRegistration): Observable<RegistrationResponse> {
    return this.http
      .post<RegistrationResponse>(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Authenticates a user and returns user data and a token.
   *
   * @param userDetails - The user login details (username and password).
   * @returns An Observable containing the user object and authentication token.
   */
  public userLogin(userDetails: UserCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all movies from the API.
   *
   * @returns An Observable containing an array of movie objects.
   */
  public getAllMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(apiUrl + 'movies')
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a single movie by its title.
   *
   * @param title - The title of the movie to retrieve.
   * @returns An Observable containing the movie object.
   */
  public getSingleMovie(title: string): Observable<Movie> {
    return this.http
      .get<Movie>(apiUrl + 'movies/' + title)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves details about a director by name.
   *
   * @param directorName - The name of the director to retrieve.
   * @returns An Observable containing the director object.
   */
  public getSingleDirector(directorName: string): Observable<Director> {
    return this.http
      .get<Director>(apiUrl + 'movies/director/' + directorName)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves details about a genre by name.
   *
   * @param genreName - The name of the genre to retrieve.
   * @returns An Observable containing the genre object.
   */
  public getSingleGenre(genreName: string): Observable<Genre> {
    return this.http
      .get<Genre>(apiUrl + 'movies/genre/' + genreName)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves user details by username.
   *
   * @param username - The username of the user to retrieve.
   * @returns An Observable containing the user object.
   */
  public getUser(username: string): Observable<User> {
    return this.http
      .get<User>(apiUrl + 'users/' + username)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   *
   * @param movieId - The ID of the movie to add to favorites.
   * @returns An Observable containing the updated user object.
   */
  public addFavoriteMovie(movieId: string): Observable<User> {
    const username = localStorage.getItem(STORAGE_KEYS.USER) || '';
    return this.http
      .post<User>(apiUrl + 'users/' + username + '/movies/' + movieId, {})
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   *
   * @param movieId - The ID of the movie to remove from favorites.
   * @returns An Observable containing the updated user object.
   */
  public deleteFavoriteMovie(movieId: string): Observable<User> {
    const username = localStorage.getItem(STORAGE_KEYS.USER) || '';
    return this.http
      .delete<User>(apiUrl + 'users/' + username + '/movies/' + movieId)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Updates the user's profile information.
   *
   * @param userDetails - The updated user details.
   * @returns An Observable containing the updated user object.
   */
  public editUser(userDetails: UserUpdate): Observable<User> {
    const username = localStorage.getItem(STORAGE_KEYS.USER) || '';
    return this.http
      .put<User>(apiUrl + 'users/' + username, userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes a user account by username.
   *
   * @param username - The username of the user to delete.
   * @returns An Observable containing the server's response as a string.
   */
  public deleteUser(username: string): Observable<string> {
    return this.http
      .delete(apiUrl + 'users/' + username, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  /*
  The API has no endpoint to get the user's favorite movies, the favorite movies are stored in the user object.
  When needed, we can get them from the user object, as already done in the react client.
  */
}
