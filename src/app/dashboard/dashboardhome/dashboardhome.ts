import { Component, computed, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { Dashboardservice } from './dashboardservice';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboardhome',
  imports: [],
  templateUrl: './dashboardhome.html',
  styleUrl: './dashboardhome.scss',
})
export class Dashboardhome {
  allContent = signal<MovieInterface[]>([]);
  filterText = signal('');
  constructor(private movieService: Dashboardservice) {}

  ngOnInit() {
    this.displayAll();
  }

  displayAll() {
    forkJoin({
      movies: this.movieService.getAllMovies(),
      series: this.movieService.getTvSeries(),
    }).subscribe(({ movies, series }) => {
      this.allContent.set(
        [...movies, ...series].sort((a, b) => a.title.localeCompare(b.title)),
      );
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
}
