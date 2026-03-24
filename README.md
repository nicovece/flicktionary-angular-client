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

## Tech Stack

- **Framework:** Angular 19+
- **UI Library:** Angular Material
- **HTTP:** Angular HttpClient
- **Testing:** Jasmine & Karma
- **Documentation:** TypeDoc
- **CI/CD:** GitHub Actions
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

- The client is pre-configured to use the Flicktionary API at `https://flicktionary.onrender.com/`.
- If you need to change the API endpoint, update the `apiUrl` in `src/app/fetch-api-data.service.ts`.

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

## Testing

Run unit tests with:

```bash
ng test
```

- Uses Jasmine and Karma.
- Test files are located alongside their respective components.

## Documentation

- Auto-generated with [TypeDoc](https://typedoc.org/).
- To generate/update docs:
  ```bash
  npx typedoc
  ```
- View documentation in the `/docs` directory or deploy to GitHub Pages.

## Deployment

The app is automatically built and deployed to GitHub Pages via a GitHub Actions workflow on every push to `main`. See [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) for details.

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
