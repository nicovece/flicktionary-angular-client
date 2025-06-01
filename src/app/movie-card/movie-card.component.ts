import { Component, OnInit } from '@angular/core';
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
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovieIds: string[] = [];
  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsComponent, {
      width: '500px',
      data: { movieTitle: movie.Title },
    });
  }

  openGenreDetailsDialog(genre: any): void {
    this.dialog.open(GenreDetailsComponent, {
      width: '500px',
      data: { genreName: genre.Name },
    });
  }

  openDirectorDetailsDialog(director: any): void {
    this.dialog.open(DirectorDetailsComponent, {
      width: '500px',
      data: { directorName: director.Name },
    });
  }

  getUserFavorites(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchMovies.getUser(username).subscribe((user: any) => {
        this.favoriteMovieIds = user.FavoriteMovies || [];
      });
    }
  }

  toggleFavorite(movie: any): void {
    const isFavorite = this.favoriteMovieIds.includes(movie._id);
    if (isFavorite) {
      this.fetchMovies.deleteFavoriteMovie(movie._id).subscribe(() => {
        this.favoriteMovieIds = this.favoriteMovieIds.filter(
          (id) => id !== movie._id
        );
        this.snackBar.open('Removed from favorites!', 'OK', { duration: 2000 });
      });
    } else {
      this.fetchMovies.addFavoriteMovie(movie._id).subscribe(() => {
        this.favoriteMovieIds.push(movie._id);
        this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
      });
    }
  }
}
