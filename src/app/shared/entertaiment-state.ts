import { computed, Injectable, signal } from '@angular/core';
import { MovieInterface } from '../dashboard/movies/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class EntertaimentState {
  items = signal<MovieInterface[]>([]);
  filterText = signal('');
  selectedItem = signal<MovieInterface | null>(null);
  bookmarkedItems = signal<Record<string, boolean>>({});

  // computed: filtered
  filteredItems = computed(() => {
    const text = this.filterText().toLowerCase();

    return this.items()
      .filter((item) => item.title.toLowerCase().includes(text))
      .sort((a, b) => a.title.localeCompare(b.title));
  });

  // computed: trending
  trendingItems = computed(() => {
    return this.items()
      .filter((item) => item.isTrending)
      .sort((a, b) => a.title.localeCompare(b.title));
  });

  // actions
  setItems(data: MovieInterface[]) {
    this.items.set(data);
  }

  toggleBookmark(item: MovieInterface) {
    const current = this.bookmarkedItems();
    current[item.title] = !current[item.title];
    this.bookmarkedItems.set({ ...current });
  }

  selectItem(item: MovieInterface) {
    this.selectedItem.set(item);
  }
}
