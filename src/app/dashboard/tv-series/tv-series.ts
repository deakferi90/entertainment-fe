import { Component, computed, inject, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-tv-series',
  imports: [],
  templateUrl: './tv-series.html',
  styleUrl: './tv-series.scss',
})
export class TvSeries {
  tvSeriesList = signal<MovieInterface[]>([]);
  allSeries: MovieInterface[] | null = null;
  filterText = signal('');
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;
  shared = inject(Shared);

  displayTvSeriesFilter = computed(() => {
    const text = this.filterText().toLowerCase();

    if (!text) return this.tvSeriesList();

    return this.tvSeriesList().filter((item) =>
      item.title.toLowerCase().includes(text),
    );
  });

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.displayTvSeries();
  }

  displayTvSeries() {
    this.shared.processEntertainment(
      (item) => item.category === 'TV Series',
      this.tvSeriesList,
    );
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
