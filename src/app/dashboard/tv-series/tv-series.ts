import { Component, computed, inject, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { Shared } from '../../shared/shared';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';
import { Router } from '@angular/router';

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

  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) {}

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
    this.sharedService.toggleBookmark(item).subscribe({
      next: () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate([this.router.url]);
      },
      error: (err) => {
        item.isBookmarked = !item.isBookmarked;
        console.error(err);
      },
    });
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
