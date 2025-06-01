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
export class GenreDetailsComponent implements OnInit {
  genre: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { genreName: string },
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.fetchApiData.getSingleGenre(this.data.genreName).subscribe((genre) => {
      this.genre = genre;
    });
  }
}
