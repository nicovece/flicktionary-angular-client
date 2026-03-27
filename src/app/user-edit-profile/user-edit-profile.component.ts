
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserUpdate, STORAGE_KEYS } from '../models/models';
@Component({
  selector: 'app-user-edit-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
],
  templateUrl: './user-edit-profile.component.html',
  styleUrl: './user-edit-profile.component.scss',
})
/**
 * Dialog component for editing the user's profile information.
 *
 * Allows the user to update their profile details and password.
 */
export class UserEditProfileComponent implements OnInit {
  fetchApiData = inject(FetchApiDataService);
  dialogRef = inject<MatDialogRef<UserEditProfileComponent>>(MatDialogRef);
  data = inject<{
    user: User;
}>(MAT_DIALOG_DATA);
  snackBar = inject(MatSnackBar);
  router = inject(Router);

  /**
   * The form data for editing the user profile.
   */
  editUserData: UserUpdate = {};

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   *
   * Initializes the form data with the current user information.
   */
  ngOnInit(): void {
    this.editUserData = { ...this.data.user };
    if (this.editUserData.Birthday) {
      this.editUserData.Birthday = this.editUserData.Birthday.split('T')[0];
    }
    this.editUserData.Password = ''; // Always start empty
  }

  /**
   * Updates the user's profile information using the API.
   *
   * If the password is changed, logs the user out and redirects to the welcome page.
   */
  updateUser(): void {
    // Create a copy to avoid mutating the form data
    const updatePayload = { ...this.editUserData };
    if (!updatePayload.Password) {
      delete updatePayload.Password; // Remove password if not set
    }
    const passwordChanged = !!this.editUserData.Password;

    this.fetchApiData.editUser(updatePayload).subscribe({
      next: () => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
        this.dialogRef.close(true);
        if (passwordChanged) {
          localStorage.removeItem(STORAGE_KEYS.USER);
          localStorage.removeItem(STORAGE_KEYS.TOKEN);
          this.router.navigate(['/welcome']);
        }
      },
      error: () => {
        this.snackBar.open('Update failed. Please try again.', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
