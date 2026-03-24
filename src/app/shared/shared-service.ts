import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieInterface } from '../dashboard/movies/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private moviesUrl = `http://localhost:5000/api/movies`;
  private tvSeriesURL = `http://localhost:5000/api/tv`;
  private allTVshowsAndMovies = `http://localhost:5000/api`;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.moviesUrl);
  }

  getTvSeries(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.tvSeriesURL);
  }

  getAllBookMarked(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.allTVshowsAndMovies);
  }
}
