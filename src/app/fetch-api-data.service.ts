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
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Creating a new user
  // Returns a user object containing the user's informations
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    console.log(apiUrl + 'users');
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  // Returns a user object containing the user's informations and a token
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get all movies
  // Returns an array of movie objects
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

  // Get a single movie by title
  // Returns a movie object containing the movie's informations
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

  // Get a single director by name
  // Returns a director object containing the director's informations
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

  // Get a single genre by name
  // Returns a genre object containing the genre's informations
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

  // Get a user by username
  // Returns a user object containing the user's informations
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

  // Add a movie to the user's favorite list
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

  // Delete a movie from the user's favorite list
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

  // Delete a user by username
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
