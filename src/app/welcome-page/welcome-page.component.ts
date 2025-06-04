// src/app/app.component.ts
import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [MatButtonModule, MatIconModule],
})
/**
 * The landing page component for the application.
 *
 * Provides entry points for user registration, login, and browsing movies.
 */
export class WelcomePageComponent {
  /**
   * The title of the application, displayed on the welcome page.
   */
  title = 'flicktionary-angular-client';

  /**
   * Creates an instance of WelcomePageComponent.
   *
   * @param dialog - Angular Material Dialog service for opening dialogs.
   * @param router - Angular Router for navigation.
   */
  constructor(public dialog: MatDialog, private router: Router) {}

  /**
   * Opens the user registration dialog when the signup button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

  /**
   * Opens the user login dialog and navigates to the movies page on successful login.
   */
  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // You can pass a flag or result from the dialog to indicate successful login
      if (result === 'success') {
        this.router.navigate(['movies']);
      }
    });
  }

  /**
   * Opens a dialog displaying the list of movies.
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
