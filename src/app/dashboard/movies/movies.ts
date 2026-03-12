import { Component, OnInit } from '@angular/core';
import { MoviesData } from './movies-data';
import { MovieInterface } from './movie.interface';
@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies implements OnInit {
  movieList: MovieInterface[] = [];
  constructor(private movieService: MoviesData) {}

  ngOnInit() {
    this.displayMovies();
  }

  displayMovies() {
    this.movieService.getAllMovies().subscribe((movies) => {
      this.movieList = movies;
    });
  }
}
