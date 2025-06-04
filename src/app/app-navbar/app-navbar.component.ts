import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * The main navigation bar component for the application.
 *
 * Displays navigation links, user authentication status, and handles user logout.
 * Provides navigation to different routes based on user actions.
 */
@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    RouterModule,
    MatTooltipModule,
  ],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.scss',
})
export class AppNavbarComponent {
  /**
   * Creates an instance of AppNavbarComponent.
   *
   * @param router - Angular Router for navigation.
   * @param platformId - The platform identifier, used to check if code is running in the browser.
   */
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Indicates whether the user is currently logged in.
   *
   * Checks for the presence of 'user' and 'token' in localStorage (browser only).
   *
   * @returns True if the user is logged in, false otherwise.
   */
  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('user') && !!localStorage.getItem('token');
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
