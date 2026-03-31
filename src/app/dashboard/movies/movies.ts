import { Component, computed, OnInit, signal } from '@angular/core';
import { SharedService } from '../../shared/shared-service';
import { MovieInterface } from './movie.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movies',
  imports: [CommonModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies implements OnInit {
  movieList = signal<MovieInterface[]>([]);
  allMovies: MovieInterface[] | null = null;
  filterText = signal('');
  changeValue = signal(false);
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;

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
    this.sharedService.getAllEntertainment().subscribe((data) => {
      const filtered = data
        .filter((item) => item.category === 'Movie')
        .sort((a, b) => a.title.localeCompare(b.title));

      this.movieList.set(filtered);

      this.allMovies = filtered.filter((item) =>
        item.title.toLowerCase().includes(this.filterText().toLowerCase()),
      );
    });
  }

  toggleBookmark(item: MovieInterface) {
    item.isBookmarked = !item.isBookmarked;
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
