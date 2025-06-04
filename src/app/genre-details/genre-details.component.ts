import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-genre-details',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './genre-details.component.html',
  styleUrl: './genre-details.component.scss',
})
/**
 * Dialog component for displaying details about a movie genre.
 *
 * Fetches and displays information about the specified genre when opened.
 */
export class GenreDetailsComponent implements OnInit {
  /**
   * The genre data fetched from the API.
   */
  genre: any;

  /**
   * Creates an instance of GenreDetailsComponent.
   *
   * @param data - Injected dialog data containing the genre's name.
   * @param fetchApiData - Service for fetching genre details from the API.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genreName: string },
    private fetchApiData: FetchApiDataService
  ) {}

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   *
   * Fetches the genre details from the API using the provided genre name.
   */
  ngOnInit(): void {
    this.fetchApiData.getSingleGenre(this.data.genreName).subscribe((genre) => {
      this.genre = genre;
    });
  }
}
