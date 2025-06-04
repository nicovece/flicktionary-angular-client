import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://flicktionary.onrender.com/';
@Injectable({
  providedIn: 'root',
})
/**
 * Main service for communicating with the Flicktionary backend API.
 *
 * Provides methods for user registration, authentication, movie retrieval, and user profile management.
 */
export class FetchApiDataService {
  /**
   * Creates an instance of FetchApiDataService.
   *
   * @param http - Angular HttpClient for making HTTP requests.
   * @param platformId - The platform identifier, used to check if code is running in the browser.
   */
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Handles HTTP errors from API requests.
   *
   * Logs the error and returns a user-friendly error message.
   *
   * @param error - The HTTP error response.
   * @returns An observable error to be handled by the subscriber.
   */
  private handleError(error: HttpErrorResponse): any {
    // Check if ErrorEvent is defined and error.error is an instance of it
    if (
      typeof ErrorEvent !== 'undefined' &&
      error.error instanceof ErrorEvent
    ) {
      // Client-side or network error
      console.error('Some error occurred:', error.error.message);
    } else {
      // Backend/server error
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Extracts the response data from an HTTP response.
   *
   * @param res - The HTTP response object.
   * @returns The response body, or an empty object if not present.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Registers a new user with the provided details.
   *
   * @param userDetails - The user registration details (username, password, email, birthday, etc.).
   * @returns An Observable containing the created user object.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    console.log(apiUrl + 'users');
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Authenticates a user and returns user data and a token.
   *
   * @param userDetails - The user login details (username and password).
   * @returns An Observable containing the user object and authentication token.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all movies from the API.
   *
   * @returns An Observable containing an array of movie objects.
   */
  public getAllMovies(): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a single movie by its title.
   *
   * @param title - The title of the movie to retrieve.
   * @returns An Observable containing the movie object.
   */
  public getSingleMovie(title: string): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves details about a director by name.
   *
   * @param directorName - The name of the director to retrieve.
   * @returns An Observable containing the director object.
   */
  public getSingleDirector(directorName: string): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves details about a genre by name.
   *
   * @param genreName - The name of the genre to retrieve.
   * @returns An Observable containing the genre object.
   */
  public getSingleGenre(genreName: string): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves user details by username.
   *
   * @param username - The username of the user to retrieve.
   * @returns An Observable containing the user object.
   */
  public getUser(username: string): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   *
   * @param movieId - The ID of the movie to add to favorites.
   * @returns An Observable containing the updated user object.
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    let username = '';
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      username = localStorage.getItem('user') || '';
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .post(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   *
   * @param movieId - The ID of the movie to remove from favorites.
   * @returns An Observable containing the updated user object.
   */
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    let username = '';
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      username = localStorage.getItem('user') || '';
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Updates the user's profile information.
   *
   * @param userDetails - The updated user details.
   * @returns An Observable containing the updated user object.
   */
  public editUser(userDetails: any): Observable<any> {
    let username = '';
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      username = localStorage.getItem('user') || '';
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .put(apiUrl + 'users/' + username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes a user account by username.
   *
   * @param username - The username of the user to delete.
   * @returns An Observable containing the server's response as a string.
   */
  public deleteUser(username: string): Observable<any> {
    let token = '';
    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token') || '';
    }
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  /*
  The API has no endpoint to get the user's favorite movies, the favorite movies are stored in the user object.
  When needed, we can get them from the user object, as already done in the react client.
  */
}
