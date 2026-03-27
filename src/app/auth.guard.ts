import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { STORAGE_KEYS } from './models/models';

@Injectable({ providedIn: 'root' })
/**
 * Route guard that protects routes from unauthorized access.
 *
 * Checks if the user is authenticated (by verifying localStorage for user and token) before allowing route activation.
 * If not authenticated, redirects to the welcome page.
 */
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private platformId = inject<object>(PLATFORM_ID);


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
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (user && token) {
        return true;
      }
    }
    // Redirect to /welcome if not authenticated
    return this.router.createUrlTree(['/welcome']);
  }
}
