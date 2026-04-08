import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MovieInterface } from '../dashboard/movies/movie.interface';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private allTVshowsAndMovies = `http://localhost:5000/api`;
  private router = inject(Router);

  constructor(private http: HttpClient) {}

  getAllEntertainment(): Observable<MovieInterface[]> {
    return this.http.get<any[]>(this.allTVshowsAndMovies).pipe(
      map((items) =>
        items.map((item) => ({
          ...item,
          id: item._id,
        })),
      ),
    );
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

  toggleBookmark(item: MovieInterface) {
    console.log('Toggling bookmark for:', item);

    const previous = item.isBookmarked;

    item.isBookmarked = !previous;

    this.http
      .put(`${this.allTVshowsAndMovies}/bookmarks/${item.id}`, {
        isBookmarked: item.isBookmarked,
      })
      .subscribe({
        next: () => {
          console.log('Bookmark updated on server');
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url]);
        },
        error: (err) => {
          console.error('Failed to update bookmark', err);

          // ❗ rollback if API fails
          item.isBookmarked = previous;
        },
      });
  }
}
