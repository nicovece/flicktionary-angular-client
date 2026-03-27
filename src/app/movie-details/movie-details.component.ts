import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Movie } from '../models/models';

@Component({
  selector: 'app-movie-details',
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
/**
 * Dialog component for displaying details about a movie.
 *
 * Fetches and displays information about the specified movie when opened.
 */
export class MovieDetailsComponent implements OnInit {
  data = inject<{
    movieTitle: string;
}>(MAT_DIALOG_DATA);
  private fetchApiData = inject(FetchApiDataService);

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
