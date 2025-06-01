import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-director-details',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss'],
})
export class DirectorDetailsComponent implements OnInit {
  director: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { directorName: string },
    private fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.fetchApiData
      .getSingleDirector(this.data.directorName)
      .subscribe((director) => {
        this.director = director;
      });
  }
}
