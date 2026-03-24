import { Component, computed, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';

@Component({
  selector: 'app-tv-series',
  imports: [],
  templateUrl: './tv-series.html',
  styleUrl: './tv-series.scss',
})
export class TvSeries {
  tvSeriesList = signal<MovieInterface[]>([]);
  filterText = signal('');
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;

  displayTvSeriesFilter = computed(() => {
    const text = this.filterText().toLowerCase();

    if (!text) return this.tvSeriesList();

    return this.tvSeriesList().filter((item) =>
      item.title.toLowerCase().includes(text),
    );
  });

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.displayMovies();
  }

  displayMovies() {
    this.sharedService.getTvSeries().subscribe((tvSeries) => {
      this.tvSeriesList.set(tvSeries);
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
