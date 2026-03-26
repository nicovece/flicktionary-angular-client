# Flicktionary Angular Client

Flicktionary is a modern, responsive Angular web application that serves as a "dictionary for flicks"—a movie database where users can browse, search, and manage their favorite movies. This client interfaces with the [Flicktionary API](https://flicktionary.onrender.com/) and provides a seamless user experience with authentication, profile management, and interactive dialogs for movie, genre, and director details.

## Features

- **User Authentication:** Register, log in, and securely manage your session.
- **Movie Browsing:** View a catalog of movies with details, genres, and directors.
- **Favorites:** Add or remove movies from your personal favorites list.
- **Profile Management:** Edit your user profile or delete your account.
- **Responsive UI:** Built with Angular Material for a modern, mobile-friendly experience.
- **Dialogs:** Quick access to movie, genre, and director details via modal dialogs.
- **Documentation:** Auto-generated with TypeDoc, available in the `/docs` directory.

## Architecture

### Key Decisions

- **Standalone Components** — No NgModules. Each component declares its own imports, making dependencies explicit and enabling tree-shaking and lazy loading at the component level.
- **Dialog-Based Navigation** — Movie, genre, and director details open in Material dialogs rather than separate routes. This keeps the user in context (the movie grid stays visible behind the dialog) and reduces route complexity.
- **Functional Interceptor** — Auth tokens are attached to outgoing requests via a functional `HttpInterceptorFn` (`auth.interceptor.ts`), keeping the API service free of authentication concerns.
- **Server-Side Rendering** — Angular SSR is configured for pre-rendering, improving initial load performance and SEO.
- **Lazy-Loaded Routes** — Authenticated routes (`/movies`, `/profile`) use `loadComponent` with dynamic imports, splitting them into separate chunks to reduce the initial bundle size.

### Project Structure

```
src/app/
├── models/              # TypeScript interfaces for API data
├── Components
│   ├── welcome-page/    # Public landing page (login/register dialogs)
│   ├── movie-card/      # Movie grid with favorites toggle
│   ├── movie-details/   # Dialog: movie synopsis
│   ├── genre-details/   # Dialog: genre info
│   ├── director-details/# Dialog: director bio
│   ├── user-profile/    # Profile view with favorites
│   ├── user-edit-profile/ # Dialog: edit profile form
│   ├── user-login-form/ # Dialog: login form
│   ├── user-registration-form/ # Dialog: signup form
│   ├── app-navbar/      # Top navigation bar
│   └── footer/          # Footer with nav links
├── auth.guard.ts        # Route guard (checks localStorage for token)
├── auth.interceptor.ts  # Attaches Bearer token to HTTP requests
├── fetch-api-data.service.ts # Typed API service (all endpoints)
└── app.routes.ts        # Route definitions with lazy loading
```

### Data Flow

1. User logs in → `FetchApiDataService.userLogin()` → token stored in localStorage
2. Subsequent requests pass through `authInterceptor` → Bearer token attached automatically
3. `AuthGuard` checks for token before activating protected routes
4. Components subscribe to service methods → data rendered in templates with loading/error states

## Tech Stack

- **Framework:** Angular 19+
- **UI Library:** Angular Material
- **HTTP:** Angular HttpClient with functional interceptor
- **Documentation:** TypeDoc
- **CI/CD:** GitHub Actions (type check + build + deploy)
- **Deployment:** GitHub Pages (client), Render (API)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/flicktionary-angular-client.git
   cd flicktionary-angular-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

#### Development Server

```bash
ng serve
```

- Navigate to [http://localhost:4200/](http://localhost:4200/).
- The app will reload automatically if you change any source files.

### API Configuration

The API URL is configured in `src/environments/environment.ts` (development) and `src/environments/environment.prod.ts` (production). Both default to `https://flicktionary.onrender.com/`.

## Usage

### User Flows

- **Sign Up:** Register with a username, password, email, and birthday.
- **Login:** Authenticate and access the movie catalog.
- **Browse Movies:** View all movies, open dialogs for details, genres, and directors.
- **Favorites:** Click the heart icon to add/remove movies from your favorites.
- **Profile:** View, edit, or delete your user profile and see your favorite movies.

### Navigation

- **Navbar:** Access movies, your profile, or log out.
- **Welcome Page:** Entry point for new users to sign up or log in.

## Documentation

- Auto-generated with [TypeDoc](https://typedoc.org/).
- To generate/update docs:
  ```bash
  npx typedoc
  ```
- View documentation in the `/docs` directory or deploy to GitHub Pages.

## Deployment

The app is automatically built and deployed to GitHub Pages via a GitHub Actions workflow on every push to `main`. The pipeline runs a TypeScript type check before building. See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for details.

To build locally for production:

```bash
ng build --base-href /flicktionary-angular-client/
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

[MIT](LICENSE) © 2024 Your Name

## Contact & Support

- For issues, use the [GitHub Issues](https://github.com/yourusername/flicktionary-angular-client/issues) page.
- For questions or feature requests, open an issue or contact the maintainer.

---
