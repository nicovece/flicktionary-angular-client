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
export class WelcomePageComponent {
  title = 'flicktionary-angular-client';

  constructor(public dialog: MatDialog, private router: Router) {}
  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px',
    });
  }

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

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
