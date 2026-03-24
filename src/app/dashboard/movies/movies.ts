import { Component, OnInit, signal } from '@angular/core';
import { SharedService } from '../../shared/shared-service';
import { MovieInterface } from './movie.interface';
@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies implements OnInit {
  movieList: MovieInterface[] = [];
  filterText = signal('');
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.displayMovies();
  }

  displayMovies() {
    this.sharedService.getAllMovies().subscribe((movies) => {
      this.movieList = movies;
    });
  }

  toggleBookmark(item: MovieInterface) {
    const current = this.bookmarkedItems();
    current[item.title] = !current[item.title];
    this.bookmarkedItems.set({ ...current });
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
