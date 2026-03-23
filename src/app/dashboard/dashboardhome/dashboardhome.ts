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
  allContent = signal<MovieInterface[]>([]);
  filterText = signal('');
  bookmarkedItems = signal<boolean[]>([]);
  selectedIndex: number | null = null;

  displayItems = computed(() => {
    const text = this.filterText().toLowerCase();
    return this.allContent()
      .filter((item) => item.title.toLowerCase().includes(text))
      .sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return a.title.localeCompare(b.title);
      });
  });

  constructor(private movieService: Dashboardservice) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    forkJoin({
      movies: this.movieService.getAllMovies(),
      series: this.movieService.getTvSeries(),
    }).subscribe(({ movies, series }) => {
      const data = [...movies, ...series];
      this.allContent.set(data);
      this.bookmarkedItems.set(new Array(data.length).fill(false));
    });
  }

  toggleBookmark(index: number) {
    const current = this.bookmarkedItems();
    current[index] = !current[index];
    this.bookmarkedItems.set([...current]);
  }

  onSelect(index: number) {
    this.selectedIndex = index;
  }
}
