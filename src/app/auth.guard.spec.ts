import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { STORAGE_KEYS } from './models/models';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: Router,
          useValue: {
            createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue('/welcome'),
          },
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should allow activation when user and token exist', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');
    localStorage.setItem(STORAGE_KEYS.TOKEN, 'fake-token');

    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to /welcome when no user', () => {
    guard.canActivate();

    expect(router.createUrlTree).toHaveBeenCalledWith(['/welcome']);
  });

  it('should redirect to /welcome when no token', () => {
    localStorage.setItem(STORAGE_KEYS.USER, 'testuser');

    guard.canActivate();

    expect(router.createUrlTree).toHaveBeenCalledWith(['/welcome']);
  });

  it('should redirect to /welcome when user is empty string', () => {
    localStorage.setItem(STORAGE_KEYS.USER, '');
    localStorage.setItem(STORAGE_KEYS.TOKEN, '');

    guard.canActivate();

    expect(router.createUrlTree).toHaveBeenCalledWith(['/welcome']);
  });
});
