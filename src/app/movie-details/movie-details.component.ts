import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Movie } from '../models/models';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
/**
 * Dialog component for displaying details about a movie.
 *
 * Fetches and displays information about the specified movie when opened.
 */
export class MovieDetailsComponent implements OnInit {
  /**
   * The movie data fetched from the API.
   */
  movie!: Movie;

  /**
   * Creates an instance of MovieDetailsComponent.
   *
   * @param data - Injected dialog data containing the movie's title.
   * @param fetchApiData - Service for fetching movie details from the API.
   */
  private destroyRef = inject(DestroyRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movieTitle: string },
    private fetchApiData: FetchApiDataService
  ) {}

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   *
   * Fetches the movie details from the API using the provided movie title.
   */
  ngOnInit(): void {
    this.fetchApiData
      .getSingleMovie(this.data.movieTitle)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movie) => {
        this.movie = movie;
      });
  }
}
