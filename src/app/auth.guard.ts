import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
/**
 * Route guard that protects routes from unauthorized access.
 *
 * Checks if the user is authenticated (by verifying localStorage for user and token) before allowing route activation.
 * If not authenticated, redirects to the welcome page.
 */
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   *
   * @param router - Angular Router for navigation and redirection.
   * @param platformId - The platform identifier, used to check if code is running in the browser.
   */
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Determines whether a route can be activated based on user authentication status.
   *
   * Checks for 'user' and 'token' in localStorage (browser only). If not authenticated, redirects to /welcome.
   *
   * @returns True if the user is authenticated, a UrlTree redirecting to /welcome otherwise.
   */
  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
        return true;
      }
    }
    // Redirect to /welcome if not authenticated
    return this.router.createUrlTree(['/welcome']);
  }
}
