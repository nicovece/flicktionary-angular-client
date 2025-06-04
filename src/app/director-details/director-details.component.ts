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
/**
 * Dialog component for displaying details about a movie director.
 *
 * Fetches and displays information about the specified director when opened.
 */
export class DirectorDetailsComponent implements OnInit {
  /**
   * The director data fetched from the API.
   */
  director: any;

  /**
   * Creates an instance of DirectorDetailsComponent.
   *
   * @param data - Injected dialog data containing the director's name.
   * @param fetchApiData - Service for fetching director details from the API.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { directorName: string },
    private fetchApiData: FetchApiDataService
  ) {}

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   *
   * Fetches the director details from the API using the provided director name.
   */
  ngOnInit(): void {
    this.fetchApiData
      .getSingleDirector(this.data.directorName)
      .subscribe((director) => {
        this.director = director;
      });
  }
}
