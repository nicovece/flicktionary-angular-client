import { Component, PLATFORM_ID, inject } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { STORAGE_KEYS } from '../models/models';

/**
 * The main navigation bar component for the application.
 *
 * Displays navigation links, user authentication status, and handles user logout.
 * Provides navigation to different routes based on user actions.
 */
@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    RouterModule,
    MatTooltipModule
],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.scss',
})
export class AppNavbarComponent {
  private router = inject(Router);
  private platformId = inject<object>(PLATFORM_ID);


  /**
   * Indicates whether the user is currently logged in.
   *
   * Checks for the presence of 'user' and 'token' in localStorage (browser only).
   *
   * @returns True if the user is logged in, false otherwise.
   */
  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(STORAGE_KEYS.USER) && !!localStorage.getItem(STORAGE_KEYS.TOKEN);
    }
    return false;
  }

  /**
   * Logs out the current user by clearing localStorage and navigating to the welcome page.
   *
   * Only executes in the browser environment.
   */
  userLogout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.router.navigate(['/welcome']);
  }
}
