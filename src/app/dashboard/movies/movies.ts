import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SharedService } from '../../shared/shared-service';
import { MovieInterface } from './movie.interface';
import { CommonModule } from '@angular/common';
import { Shared } from '../../shared/shared';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  imports: [CommonModule, SharedBookmark],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies implements OnInit {
  movieList = signal<MovieInterface[]>([]);
  allMovies: MovieInterface[] | null = null;
  filterText = signal('');
  selectedItem: MovieInterface | null = null;
  shared = inject(Shared);

  displayMoviesFilter = computed(() => {
    const text = this.filterText().toLowerCase();

    if (!text) return this.movieList();

    return this.movieList().filter((item) =>
      item.title.toLowerCase().includes(text),
    );
  });

  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.displayMovies();
  }

  displayMovies() {
    this.shared.processEntertainment(
      (item) => item.category === 'Movie',
      this.movieList,
    );
  }

  toggleBookmark(item: MovieInterface) {
    item.isBookmarked = !item.isBookmarked;

    this.sharedService.toggleBookmark(item).subscribe({
      next: () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate([this.router.url]);
      },
      error: (err) => {
        item.isBookmarked = !item.isBookmarked;
        console.error(err);
      },
    });
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
