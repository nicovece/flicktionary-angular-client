export const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
} as const;

export interface Genre {
  Name: string;
  Description: string;
}

export interface Director {
  Name: string;
  Description: string;
  Bio: string;
  Birth: string;
  Death?: string;
}

export interface Movie {
  _id: string;
  Title: string;
  Description: string;
  Genre: Genre;
  Director: Director;
  ImagePath: string;
  Featured: boolean;
}

export interface User {
  _id: string;
  Username: string;
  Email: string;
  Birthday: string;
  FavoriteMovies: string[];
}

export interface LoginResponse {
  user: User;
  token: string;
  message?: string;
}

export interface RegistrationResponse {
  message?: string;
}

export interface UserCredentials {
  Username: string;
  Password: string;
}

export interface UserRegistration {
  Username: string;
  Password: string;
  Email: string;
  Birthday?: string;
}

export interface UserUpdate {
  Username?: string;
  Email?: string;
  Birthday?: string;
  Password?: string;
}
