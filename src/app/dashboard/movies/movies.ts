import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SharedService } from '../../shared/shared-service';
import { MovieInterface } from './movie.interface';
import { CommonModule } from '@angular/common';
import { Shared } from '../../shared/shared';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';
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
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;
  shared = inject(Shared);

  displayMoviesFilter = computed(() => {
    const text = this.filterText().toLowerCase();

    if (!text) return this.movieList();

    return this.movieList().filter((item) =>
      item.title.toLowerCase().includes(text),
    );
  });

  constructor(private sharedService: SharedService) {}

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
    this.sharedService.toggleBookmark(item);
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
