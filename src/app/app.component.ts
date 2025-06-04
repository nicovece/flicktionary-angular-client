// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, AppNavbarComponent, FooterComponent],
})
/**
 * The root component of the Flicktionary Angular client application.
 *
 * Serves as the main container for the application layout, including the navigation bar, router outlet, and footer.
 */
export class AppComponent {
  /**
   * The title of the application, displayed in the browser tab and used throughout the app.
   */
  title = 'flicktionary-angular-client';
}
