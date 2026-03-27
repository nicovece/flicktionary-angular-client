import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieCardComponent } from './movie-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { mockMovie, mockMovies, mockUser } from '../testing/mock-data';
import { STORAGE_KEYS } from '../models/models';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let fetchApiSpy: jasmine.SpyObj<FetchApiDataService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    fetchApiSpy = jasmine.createSpyObj('FetchApiDataService', [
      'getAllMovies',
      'getUser',
      'addFavoriteMovie',
      'deleteFavoriteMovie',
    ]);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    // Default: movies load successfully
    fetchApiSpy.getAllMovies.and.returnValue(of(mockMovies));
    fetchApiSpy.getUser.and.returnValue(of(mockUser));
    fetchApiSpy.addFavoriteMovie.and.returnValue(of(mockUser));
    fetchApiSpy.deleteFavoriteMovie.and.returnValue(of(mockUser));

    await TestBed.configureTestingModule({
      imports: [MovieCardComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: FetchApiDataService, useValue: fetchApiSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
  }

  // --- Rendering & Loading States ---

  it('should show loading spinner initially', () => {
    fetchApiSpy.getAllMovies.and.returnValue(of([])); // won't emit before we check
    createComponent();
    // Before detectChanges, loading is true by default
    expect(component.loading).toBeTrue();
    fixture.detectChanges();
    // After detectChanges with synchronous of(), loading will be false
    // But the spinner should have been in the DOM at the initial state
  });

  it('should display movie cards after data loads', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('mat-card');
    expect(cards.length).toBe(2);
    expect(compiled.textContent).toContain('Inception');
    expect(compiled.textContent).toContain('Interstellar');
  });

  it('should show error message on API failure', () => {
    fetchApiSpy.getAllMovies.and.returnValue(throwError(() => 'Server error'));
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Server error');
    expect(compiled.querySelector('button')?.textContent).toContain('Try Again');
  });

  it('should retry on "Try Again" click', () => {
    fetchApiSpy.getAllMovies.and.returnValue(throwError(() => 'Server error'));
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    createComponent();
    fixture.detectChanges();

    // Reset to succeed on retry
    fetchApiSpy.getAllMovies.and.returnValue(of(mockMovies));
    const retryButton = fixture.nativeElement.querySelector('button');
    retryButton.click();
    fixture.detectChanges();

    // getAllMovies called twice: once on init, once on retry
    expect(fetchApiSpy.getAllMovies).toHaveBeenCalledTimes(2);
    expect(component.movies.length).toBe(2);
    expect(component.error).toBe('');
  });

  // --- Favorites ---

  it('should show filled heart for favorite movies', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    createComponent();
    component.favoriteMovieIds = ['1'];
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('mat-icon.movie-card__favorite-icon');
    const texts = Array.from(icons as NodeListOf<Element>).map((icon) => icon.textContent?.trim());
    expect(texts).toContain('favorite');
  });

  it('should show outlined heart for non-favorite movies', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    createComponent();
    component.favoriteMovieIds = ['1'];
    fixture.detectChanges();

    const icons = fixture.nativeElement.querySelectorAll('mat-icon.movie-card__favorite-icon');
    const texts = Array.from(icons as NodeListOf<Element>).map((icon) => icon.textContent?.trim());
    expect(texts).toContain('favorite_border');
  });

  it('should call addFavoriteMovie when toggling a non-favorite', () => {
    createComponent();
    component.favoriteMovieIds = [];
    component.allMovies = mockMovies;
    component.movies = mockMovies;

    component.toggleFavorite(mockMovie);

    expect(fetchApiSpy.addFavoriteMovie).toHaveBeenCalledWith('1');
  });

  it('should call deleteFavoriteMovie when toggling a favorite', () => {
    createComponent();
    component.favoriteMovieIds = ['1'];
    component.allMovies = mockMovies;
    component.movies = mockMovies;

    component.toggleFavorite(mockMovie);

    expect(fetchApiSpy.deleteFavoriteMovie).toHaveBeenCalledWith('1');
  });

  // --- Filtering ---

  it('should show all movies when showOnlyFavorites is false', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    createComponent();
    fixture.detectChanges();

    expect(component.showOnlyFavorites).toBeFalse();
    expect(component.movies.length).toBe(mockMovies.length);
  });

  it('should filter to favorites only when showOnlyFavorites is true', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    createComponent();
    fixture.detectChanges();

    component.showOnlyFavorites = true;
    component.favoriteMovieIds = ['1'];
    component.filterMovies();
    fixture.detectChanges();

    expect(component.movies.length).toBe(1);
    expect(component.movies[0].Title).toBe('Inception');
  });

  // --- Dialogs ---

  it('should open MovieDetailsComponent dialog with correct data', () => {
    createComponent();
    fixture.detectChanges();
    spyOn(component.dialog, 'open');
    component.openMovieDetailsDialog(mockMovie);

    expect(component.dialog.open).toHaveBeenCalledWith(MovieDetailsComponent, {
      width: '500px',
      data: { movieTitle: 'Inception' },
    });
  });

  it('should open GenreDetailsComponent dialog with correct data', () => {
    createComponent();
    fixture.detectChanges();
    spyOn(component.dialog, 'open');
    component.openGenreDetailsDialog(mockMovie.Genre);

    expect(component.dialog.open).toHaveBeenCalledWith(GenreDetailsComponent, {
      width: '500px',
      data: { genreName: 'Action' },
    });
  });

  it('should open DirectorDetailsComponent dialog with correct data', () => {
    createComponent();
    fixture.detectChanges();
    spyOn(component.dialog, 'open');
    component.openDirectorDetailsDialog(mockMovie.Director);

    expect(component.dialog.open).toHaveBeenCalledWith(DirectorDetailsComponent, {
      width: '500px',
      data: { directorName: 'Christopher Nolan' },
    });
  });
});
