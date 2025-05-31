// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, AppNavbarComponent],
})
export class AppComponent {
  title = 'flicktionary-angular-client';
}
