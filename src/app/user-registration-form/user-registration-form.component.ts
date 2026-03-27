// src/app/user-registration-form/user-registration-form.component.ts
import { Component, Input, inject } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserRegistration } from '../models/models';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
/**
 * Dialog component for user registration.
 *
 * Allows users to enter their details and register a new account with the backend API.
 */
export class UserRegistrationFormComponent {
  fetchApiData = inject(FetchApiDataService);
  dialogRef = inject<MatDialogRef<UserRegistrationFormComponent>>(MatDialogRef);
  snackBar = inject(MatSnackBar);

  /**
   * The user registration data entered in the form.
   */
  @Input() userData: UserRegistration = { Username: '', Password: '', Email: '' };

  /**
   * Registers a new user using the provided form data.
   *
   * On success, closes the dialog and shows a notification.
   * On failure, shows an error notification.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(
          result.message || 'User registered successfully!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
