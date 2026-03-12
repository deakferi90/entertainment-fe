import { Component } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { Dashboardservice } from './dashboardservice';

@Component({
  selector: 'app-dashboardhome',
  imports: [],
  templateUrl: './dashboardhome.html',
  styleUrl: './dashboardhome.scss',
})
export class Dashboardhome {
  movieList: MovieInterface[] = [];
  constructor(private movieService: Dashboardservice) {}

  ngOnInit() {
    this.displayMovies();
  }

  displayMovies() {
    this.movieService.getAllMovies().subscribe((movies) => {
      this.movieList = movies;
    });
  }
}
