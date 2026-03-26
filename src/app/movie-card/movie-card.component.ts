import {
  Component,
  DestroyRef,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { Movie, Genre, Director, User, STORAGE_KEYS } from '../models/models';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
  ],
})
/**
 * Component for displaying a grid or list of movie cards.
 *
 * Handles displaying all movies, filtering by favorites, and managing favorite status.
 */
export class MovieCardComponent implements OnInit, OnChanges {
  /**
   * The list of movies currently displayed (filtered or all).
   */
  movies: Movie[] = [];
  /**
   * The complete list of all movies fetched from the API.
   */
  allMovies: Movie[] = [];
  /**
   * The list of favorite movie IDs for the current user.
   */
  @Input() favoriteMovieIds: string[] = [];
  /**
   * Whether to show only favorite movies in the list.
   */
  @Input() showOnlyFavorites = false;

  /**
   * Creates an instance of MovieCardComponent.
   *
   * @param fetchMovies - Service for fetching movies and user data from the API.
   * @param dialog - Angular Material Dialog service for opening dialogs.
   * @param snackBar - Angular Material SnackBar service for showing notifications.
   */
  private destroyRef = inject(DestroyRef);

  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   *
   * Fetches user favorites (if not provided) and all movies from the API.
   */
  ngOnInit(): void {
    if (!this.favoriteMovieIds || this.favoriteMovieIds.length === 0) {
      this.getUserFavorites();
    }
    this.getMovies();
  }

  /**
   * Angular lifecycle hook called when input properties change.
   *
   * @param changes - The changed input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['favoriteMovieIds'] || changes['showOnlyFavorites']) &&
      this.allMovies.length > 0
    ) {
      this.filterMovies();
    }
  }

  /**
   * Fetches all movies from the API and applies filtering.
   *
   * @returns The filtered list of movies.
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((resp: Movie[]) => {
        this.allMovies = resp;
        this.filterMovies();
      });
  }

  /**
   * Filters the list of movies based on the favorite status and input properties.
   */
  filterMovies(): void {
    if (
      this.showOnlyFavorites &&
      this.favoriteMovieIds &&
      this.favoriteMovieIds.length > 0
    ) {
      this.movies = this.allMovies.filter((movie: Movie) =>
        this.favoriteMovieIds.includes(movie._id)
      );
    } else {
      this.movies = this.allMovies;
    }
  }

  /**
   * Opens a dialog displaying details for the selected movie.
   *
   * @param movie - The movie object to display details for.
   */
  openMovieDetailsDialog(movie: Movie): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '500px',
      data: { movieTitle: movie.Title },
    });
  }

  /**
   * Opens a dialog displaying details for the selected genre.
   *
   * @param genre - The genre object to display details for.
   */
  openGenreDetailsDialog(genre: Genre): void {
    this.dialog.open(GenreDetailsComponent, {
      width: '500px',
      data: { genreName: genre.Name },
    });
  }

  /**
   * Opens a dialog displaying details for the selected director.
   *
   * @param director - The director object to display details for.
   */
  openDirectorDetailsDialog(director: Director): void {
    this.dialog.open(DirectorDetailsComponent, {
      width: '500px',
      data: { directorName: director.Name },
    });
  }

  /**
   * Fetches the current user's favorite movies from the API and updates the favoriteMovieIds property.
   */
  getUserFavorites(): void {
    const username = localStorage.getItem(STORAGE_KEYS.USER);
    if (username) {
      this.fetchMovies.getUser(username)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((user: User) => {
        this.favoriteMovieIds = user.FavoriteMovies || [];
        this.filterMovies();
      });
    }
  }

  /**
   * Toggles the favorite status of a movie for the current user.
   *
   * @param movie - The movie object to add or remove from favorites.
   */
  toggleFavorite(movie: Movie): void {
    const isFavorite = this.favoriteMovieIds.includes(movie._id);
    if (isFavorite) {
      this.fetchMovies.deleteFavoriteMovie(movie._id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
        this.favoriteMovieIds = this.favoriteMovieIds.filter(
          (id) => id !== movie._id
        );
        this.snackBar.open('Removed from favorites!', 'OK', { duration: 2000 });
        this.filterMovies();
      });
    } else {
      this.fetchMovies.addFavoriteMovie(movie._id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
        this.favoriteMovieIds.push(movie._id);
        this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
        this.filterMovies();
      });
    }
  }
}
