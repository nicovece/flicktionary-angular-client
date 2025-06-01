import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { movieTitle: string },
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.fetchApiData
      .getSingleMovie(this.data.movieTitle)
      .subscribe((movie) => {
        this.movie = movie;
      });
  }
}
