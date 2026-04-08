import { Component, computed, inject, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { Shared } from '../../shared/shared';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';

@Component({
  selector: 'app-tv-series',
  imports: [SharedBookmark],
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
    this.sharedService.toggleBookmark(item);
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
