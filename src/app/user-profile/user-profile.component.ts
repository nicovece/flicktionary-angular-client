import { Component } from '@angular/core';
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
export class UserProfileComponent {
  user: any = {};
  loading = true;
  formattedBirthday: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    if (!username) {
      this.router.navigate(['/welcome']);
      return;
    }
    this.loading = true;
    this.fetchApiData.getUser(username).subscribe({
      next: (res: any) => {
        this.user = res;
        this.formattedBirthday = new Date(
          this.user.Birthday
        ).toLocaleDateString();
        console.log(this.user);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        // Optionally handle error
      },
    });
  }

  // getUserData(): void {
  //   const localUser: string | null = localStorage.getItem('user');

  //   if (!localUser) {
  //     this.router.navigate(['/welcome']);
  //     return;
  //   }
  //   const parsedUser: any = JSON.parse(localUser);
  //   this.fetchApiData.getUser(parsedUser.Username).subscribe((result) => {
  //     this.user = result;
  //     delete this.user.Password;
  //     this.birthday = new Date(this.user.Birthday).toLocaleDateString();
  //     localStorage.setItem('user', JSON.stringify(result));
  //     this.getFavoriteMovies();
  //   });
  // }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(UserEditProfileComponent, {
      width: '280px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUser();
      }
    });
  }

  deleteAccount(): void {
    const username = localStorage.getItem('user');
    if (!username) {
      return;
    }
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.fetchApiData.deleteUser(username).subscribe({
        next: () => {
          // Clean up all user-related data from localStorage
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          // If you store other keys, remove them here as well
          // localStorage.removeItem('otherKey');

          // Optionally reset in-memory user state
          this.user = {};
          this.formattedBirthday = '';

          // Redirect to welcome view
          this.router.navigate(['/welcome']);
        },
        error: (err) => {
          // Optionally show an error message
          console.error('Failed to delete account', err);
        },
      });
    }
  }
}
