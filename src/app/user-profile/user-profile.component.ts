import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { UserEditProfileComponent } from '../user-edit-profile/user-edit-profile.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { User, STORAGE_KEYS } from '../models/models';

@Component({
  selector: 'app-user-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MovieCardComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
/**
 * Component for displaying and managing the user's profile.
 *
 * Shows user information, allows editing the profile, and account deletion.
 */
export class UserProfileComponent {
  /**
   * The user data object fetched from the API.
   */
  user: User = {} as User;
  /**
   * Indicates whether the profile data is currently loading.
   */
  loading = true;
  /**
   * The user's birthday formatted as a locale date string.
   */
  formattedBirthday: string = '';

  /**
   * Creates an instance of UserProfileComponent.
   *
   * @param fetchApiData - Service for fetching and updating user data via the API.
   * @param router - Angular Router for navigation.
   * @param dialog - Angular Material Dialog service for opening dialogs.
   */
  private destroyRef = inject(DestroyRef);

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   *
   * Fetches the user data from the API.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches the current user's data from the API and updates the component state.
   */
  getUser(): void {
    const username = localStorage.getItem(STORAGE_KEYS.USER);
    if (!username) {
      this.router.navigate(['/welcome']);
      return;
    }
    this.loading = true;
    this.fetchApiData.getUser(username)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (res: User) => {
        this.user = res;
        this.formattedBirthday = new Date(
          this.user.Birthday
        ).toLocaleDateString();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        // Optionally handle error
      },
    });
  }

  /**
   * Opens a dialog for editing the user's profile information.
   *
   * After the dialog is closed, refreshes the user data if changes were made.
   */
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(UserEditProfileComponent, {
      width: '280px',
      data: { user: this.user },
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
      if (result) {
        this.getUser();
      }
    });
  }

  /**
   * Deletes the user's account after confirmation.
   *
   * Removes user data from localStorage and redirects to the welcome page on success.
   */
  deleteAccount(): void {
    const username = localStorage.getItem(STORAGE_KEYS.USER);
    if (!username) {
      return;
    }
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.fetchApiData.deleteUser(username)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
        next: () => {
          // Clean up all user-related data from localStorage
          localStorage.removeItem(STORAGE_KEYS.USER);
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          // If you store other keys, remove them here as well
          // localStorage.removeItem('otherKey');

          // Optionally reset in-memory user state
          this.user = {} as User;
          this.formattedBirthday = '';

          // Redirect to welcome view
          this.router.navigate(['/welcome']);
        },
        error: (err) => {
          // Optionally show an error message
          // Error handled silently - user stays on the page
        },
      });
    }
  }
}
