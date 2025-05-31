import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
