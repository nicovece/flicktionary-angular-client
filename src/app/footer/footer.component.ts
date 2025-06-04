import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
/**
 * The footer component for the application.
 *
 * Displays the current date and provides user authentication status and logout functionality.
 */
export class FooterComponent {
  /**
   * The current date, used for display in the footer.
   */
  today = new Date();

  /**
   * Creates an instance of FooterComponent.
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
