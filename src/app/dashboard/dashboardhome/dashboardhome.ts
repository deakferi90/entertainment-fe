import { Component, computed, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { Dashboardservice } from './dashboardservice';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboardhome',
  imports: [CommonModule],
  templateUrl: './dashboardhome.html',
  styleUrl: './dashboardhome.scss',
})
export class Dashboardhome {
  // All movies and series
  allContent = signal<MovieInterface[]>([]);
  // Search input
  filterText = signal('');
  // Bookmark states
  bookmarkedItems = signal<boolean[]>([]);
  // Optional: selected item index
  selectedIndex: number | null = null;

  // Computed property: filtered + sorted
  displayItems = computed(() => {
    const text = this.filterText().toLowerCase();

    return this.allContent()
      .filter((item) => item.title.toLowerCase().includes(text))
      .sort((a, b) => {
        // Trending first
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        // Alphabetical by title
        return a.title.localeCompare(b.title);
      });
  });

  constructor(private movieService: Dashboardservice) {}

  ngOnInit() {
    this.loadAllContent();
  }

  // Load movies + series
  loadAllContent() {
    forkJoin({
      movies: this.movieService.getAllMovies(),
      series: this.movieService.getTvSeries(),
    }).subscribe(({ movies, series }) => {
      const combined = [...movies, ...series];

      combined.sort((a, b) => a.title.localeCompare(b.title));
      this.allContent.set(combined);
      this.bookmarkedItems.set(new Array(combined.length).fill(false));
    });
  }

  // Toggle bookmark
  toggleBookmark(index: number) {
    const current = this.bookmarkedItems();
    current[index] = !current[index];
    this.bookmarkedItems.set([...current]);
  }

  // Select an item
  onSelect(index: number) {
    this.selectedIndex = index;
  }
}
