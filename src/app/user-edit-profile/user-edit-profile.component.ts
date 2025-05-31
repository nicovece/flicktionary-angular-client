import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-user-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './user-edit-profile.component.html',
  styleUrl: './user-edit-profile.component.scss',
})
export class UserEditProfileComponent {
  editUserData: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserEditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.editUserData = { ...this.data.user };
    if (this.editUserData.Birthday) {
      this.editUserData.Birthday = this.editUserData.Birthday.split('T')[0];
    }
    this.editUserData.Password = ''; // Always start empty
  }

  updateUser(): void {
    // Create a copy to avoid mutating the form data
    const updatePayload = { ...this.editUserData };
    if (!updatePayload.Password) {
      delete updatePayload.Password; // Remove password if not set
    }
    const passwordChanged = !!this.editUserData.Password;

    this.fetchApiData.editUser(updatePayload).subscribe({
      next: (result) => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
        this.dialogRef.close(true);
        if (passwordChanged) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          // Use router if injected, otherwise fallback to window.location
          window.location.href = '/welcome';
        }
      },
      error: (err) => {
        this.snackBar.open('Update failed. Please try again.', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
