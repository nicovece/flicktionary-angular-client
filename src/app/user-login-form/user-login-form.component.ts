import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
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
 * Dialog component for user login.
 *
 * Allows users to enter their credentials and authenticate with the backend API.
 */
export class UserLoginFormComponent implements OnInit {
  /**
   * The user login data entered in the form.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   *
   * @param fetchApiData - Service for user authentication via the API.
   * @param dialogRef - Reference to the dialog opened for login.
   * @param snackBar - Angular Material SnackBar service for showing notifications.
   * @param router - Angular Router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {}

  /**
   * Authenticates the user using the provided credentials.
   *
   * On success, stores the user and token in localStorage, closes the dialog, and shows a notification.
   * On failure, shows an error notification.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close('success');
        console.log(result);
        this.snackBar.open(
          result.message || 'User logged in successfully!',
          'OK',
          {
            duration: 2000,
          }
        );
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
