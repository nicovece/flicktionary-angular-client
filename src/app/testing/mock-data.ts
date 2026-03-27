import {
  Genre,
  Director,
  Movie,
  User,
  LoginResponse,
} from '../models/models';

export const mockGenre: Genre = {
  Name: 'Action',
  Description: 'Action movies featuring exciting sequences',
};

export const mockDirector: Director = {
  Name: 'Christopher Nolan',
  Description: 'British-American filmmaker known for complex narratives',
  Bio: 'Christopher Edward Nolan is a British-American filmmaker.',
  Birth: '1970-07-30',
};

export const mockMovie: Movie = {
  _id: '1',
  Title: 'Inception',
  Description: 'A thief who steals corporate secrets through dream-sharing technology.',
  Genre: mockGenre,
  Director: mockDirector,
  ImagePath: 'https://example.com/inception.jpg',
  Featured: true,
};

export const mockMovies: Movie[] = [
  mockMovie,
  {
    ...mockMovie,
    _id: '2',
    Title: 'Interstellar',
    Description: 'A team of explorers travel through a wormhole in space.',
    Featured: false,
  },
];

export const mockUser: User = {
  _id: 'u1',
  Username: 'testuser',
  Email: 'test@test.com',
  Birthday: '1990-01-01',
  FavoriteMovies: ['1'],
};

export const mockLoginResponse: LoginResponse = {
  user: mockUser,
  token: 'fake-jwt-token',
};
