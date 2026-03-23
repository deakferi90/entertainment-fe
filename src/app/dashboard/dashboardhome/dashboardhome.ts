import { Component, computed, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { Dashboardservice } from './dashboardservice';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboardhome',
  imports: [CommonModule],
  templateUrl: './dashboardhome.html',
  styleUrls: ['./dashboardhome.scss'],
})
export class Dashboardhome {
  allContent = signal<MovieInterface[]>([]);
  filterText = signal('');
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;

  displayItems = computed(() => {
    const text = this.filterText().toLowerCase();
    return this.allContent()
      .filter((item) => item.title.toLowerCase().includes(text))
      .sort((a, b) => a.title.localeCompare(b.title));
  });

  constructor(private movieService: Dashboardservice) {}

  ngOnInit() {
    this.loadAllContent();
  }

  loadAllContent() {
    forkJoin({
      movies: this.movieService.getAllMovies(),
      series: this.movieService.getTvSeries(),
    }).subscribe(({ movies, series }) => {
      const combined = [...movies, ...series];

      combined.sort((a, b) => a.title.localeCompare(b.title));
      this.allContent.set(combined);

      const bookmarks: Record<string, boolean> = {};
      combined.forEach((item) => (bookmarks[item.title] = false));
      this.bookmarkedItems.set(bookmarks);
    });
  }

  toggleBookmark(item: MovieInterface) {
    const current = this.bookmarkedItems();
    current[item.title] = !current[item.title]; // toggle by unique key
    this.bookmarkedItems.set({ ...current }); // update signal
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
