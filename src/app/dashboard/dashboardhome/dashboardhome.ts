import { Component } from '@angular/core';
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
  allContent: MovieInterface[] = [];
  constructor(private movieService: Dashboardservice) {}

  ngOnInit() {
    this.displayAll();
  }

  displayAll() {
    forkJoin({
      movies: this.movieService.getAllMovies(),
      series: this.movieService.getTvSeries(),
    }).subscribe(({ movies, series }) => {
      this.allContent = [...movies, ...series].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
    });
  }
}
