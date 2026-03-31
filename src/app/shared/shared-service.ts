import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieInterface } from '../dashboard/movies/movie.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private allTVshowsAndMovies = `http://localhost:5000/api`;

  constructor(private http: HttpClient) {}

  getAllEntertainment(): Observable<MovieInterface[]> {
    return this.http.get<MovieInterface[]>(this.allTVshowsAndMovies);
  }

  getMovies() {
    return this.getAllEntertainment().pipe(
      map((items) => items.filter((i) => i.category === 'Movie')),
    );
  }

  getTv() {
    return this.getAllEntertainment().pipe(
      map((items) => items.filter((i) => i.category === 'TV Series')),
    );
  }
}
