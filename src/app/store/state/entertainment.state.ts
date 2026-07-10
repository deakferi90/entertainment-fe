import { MovieInterface } from '../../dashboard/movies/movie.interface';

export interface EntertainmentState {
  items: MovieInterface[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export const initialState: EntertainmentState = {
  items: [],
  loading: false,
  error: null,
  searchTerm: '',
};
