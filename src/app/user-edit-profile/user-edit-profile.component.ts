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
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.editUserData = { ...this.data.user };
    if (this.editUserData.Birthday) {
      this.editUserData.Birthday = this.editUserData.Birthday.split('T')[0];
    }
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.editUserData).subscribe({
      next: (result) => {
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
        this.dialogRef.close(true); // Optionally pass a flag to indicate success
      },
      error: (err) => {
        this.snackBar.open('Update failed. Please try again.', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
