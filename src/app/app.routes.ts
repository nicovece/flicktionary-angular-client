/**
 * Main client-side route definitions for the Angular application.
 *
 * Authenticated routes use lazy loading via loadComponent to reduce the initial bundle size.
 */
import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'movies',
    loadComponent: () =>
      import('./movie-card/movie-card.component').then(
        (m) => m.MovieCardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
