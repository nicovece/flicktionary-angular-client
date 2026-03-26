import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

/**
 * Functional HTTP interceptor that attaches a Bearer token to outgoing requests.
 *
 * Reads the token from localStorage (browser only) and adds it as an
 * Authorization header to every request targeting the application API.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token = '';

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token') || '';
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
