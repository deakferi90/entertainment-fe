import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dashboardservice {
  private moviesUrl = `http://localhost:5000/api/movies`;

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.moviesUrl);
  }
}
