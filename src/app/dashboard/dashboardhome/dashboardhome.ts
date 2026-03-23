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
  bookmark: string = 'assets/bookmark2.svg';
  filterText = signal('');
  bookmarked = signal(false);
  selectedIndex: number | null = null;
  bookmarkedItems = signal<boolean[]>([]);
  constructor(private movieService: Dashboardservice) {}

  ngOnInit() {
    this.displayAll();
  }

  onSelect(index: number) {
    this.selectedIndex = index;
  }

  displayAll() {
    forkJoin({
      movies: this.movieService.getAllMovies(),
      series: this.movieService.getTvSeries(),
    }).subscribe(({ movies, series }) => {
      const data = [...movies, ...series];
      this.allContent.set(data);

      this.bookmarkedItems.set(new Array(data.length).fill(false));
    });
  }

  filteredItems = computed(() => {
    const text = this.filterText();
    return this.allContent().filter((item) =>
      item.title.toLowerCase().includes(text),
    );
  });

  filterSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.filterText.set(val);
  }

  toggleBookmark(index: number) {
    const current = this.bookmarkedItems();
    current[index] = !current[index];
    this.bookmarkedItems.set([...current]);
  }
}
