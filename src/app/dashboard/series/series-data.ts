import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { MovieInterface } from './movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesData {
  private moviesUrl = `http://localhost:5000/api/movies`;

  constructor(private http: HttpClient) {}

  //   getAllMovies(): Observable<MovieInterface[]> {
  //     return this.http.get<MovieInterface[]>(this.moviesUrl);
  //   }
}
